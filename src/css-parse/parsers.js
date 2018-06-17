import flow from 'lodash/fp/flow'
import get from 'lodash/fp/get'
import map from 'lodash/fp/map'
import reduce from 'lodash/fp/reduce'
import filter from 'lodash/fp/filter'
import isObject from 'lodash/isObject'
import uniq from 'lodash/uniq'
import isNumber from 'lodash/isNumber'

export const parseCss = rawCss =>  flow([
  clean,
  parse(/([^{};]*)([;{}])/g, { block: [] }),
  get('block'),
  concatSelectors,
  cleanNotObjectSelectors,
  normalizeMultipleDefinitionSelector,
  normalizeChildSelector,
  normalizeSiblingSelector,
  ignoreAfterSpecialSelectors,
  removeDotNotation,
  uniq
])(rawCss)

export const concatSelectors = reduce((acc, obj) => acc.concat(obj.selector || []), [])

export const cleanNotObjectSelectors = filter(selector => !isObject(selector))

export const normalizeChildSelector = reduce((acc, s) => [...acc, ...s.split(' ')], [])

export const normalizeMultipleDefinitionSelector = reduce((acc, s) => [...acc, ...s.split(',')], [])

export const normalizeSiblingSelector = reduce((acc, selector) => {
  const pointPositions = selector.split('').map((i, index) => i === '.' ? index : false).filter(a => isNumber(a))
  if (pointPositions.length === 0) return acc

  const temp = selector.split('.').map(i => '.' + i).slice(1).filter(i => i.length > 1)

  return [...acc, ...temp]
}, [])

const removeAfterChar = [
  ':',
  '[',
  '>',
  ')',
  '+',
  '~',
  '*'
]

export const ignoreAfterSpecialSelectors = reduce((acc, selector) => {
  const removeAfterIndex = removeAfterChar
    .map(char => selector.indexOf(char))
    .filter(i => i !== -1)
    .sort((a, b) => a - b)
    [0]

  if (removeAfterIndex) {
    // console.log(`selector: ${selector}, i: ${removeAfterIndex}`)
    return acc.concat(selector.slice(0, removeAfterIndex))
  }
  return acc.concat(selector)
}, [])

export const removeDotNotation = map(selector => selector.replace('.', ''))

export const clean = css => flow([
  removeComments,
  removeTrailingSpaces,
  removeTrailingSeparatorSpaces,
  removeUnnecessarySeparators,
  addTrailingSeparators
])(css)

export const removeComments = css => css.replace(/\/\*[\W\w]*?\*\//g, '')

export const removeTrailingSpaces = css => css.replace(/^\s+|\s+$/g, '')

export const removeTrailingSeparatorSpaces = css => css.replace(/\s*([:;{}])\s*/g, '$1')

export const removeUnnecessarySeparators = css => css.replace(/\};+/g, '}')

export const addTrailingSeparators = css => css.replace(/([^:;{}])}/g, '$1;}')

export const parse = (regExp, object) => css => {
  for (var m; (m = regExp.exec(css)) != null;) {
    if (m[2] == '{') object.block.push(object = {
      'selector': refine(m[1], true),
      'block': [],
      'parent': object
    })
    else if (m[2] == '}') object = object.parent
    else if (m[2] == ';') object.block.push(refine(m[1]))
  }

  return object
}

export const refine = (css, isBlock) =>
  /^@/.test(css) ? (css = css.split(' ')) && {
    'identifier': css.shift().substr(1).toLowerCase(),
    'parameters': css.join(' ')
  } : (isBlock ? /:$/ : /:/).test(css) ? (css = css.split(':')) && {
    'property': css.shift(),
    'value': css.join(':')
  } : css
