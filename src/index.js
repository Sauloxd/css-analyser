const Promise = require('bluebird')
const uniq = require('lodash/uniq')
const _ = require('lodash')
const isObject = require('lodash/isObject')
const flatten = require('lodash/flatten')
const exec = Promise.promisify(require('child_process').exec)
const { writeFileSync, readFileSync } = require('fs')
const subjectPath = '/Users/saulofuruta/QultureRocks/qultureapp'

const sass = require('node-sass')
const minifyCss = require('clean-css')
const printFileSync = (params) => writeFileSync.apply(null, params.concat('utf-8'))

const jsPath = `${subjectPath}/app`
const cssPath = `${subjectPath}/app/assets/stylesheets`

function buildSass() {
  var sass = require('node-sass')
  sass.render({
    file: cssPath + '/application.scss',
    includePaths: [
      subjectPath + '/node_modules',
      subjectPath + '/vendor/assets/bower_components'
    ]
  }, function (err, result) {
    console.log('eerr', err)
    // console.log('result: ', result.stats.includedFiles)
    printFileSync(['css-result.css', result.css])
    printFileSync(['css-result-files-read.css', JSON.stringify(result.stats.includedFiles, null, 2)])
    readResult()
  })
  // OR
}

const parseCSS = function (css) {
  return parse(clean(css), /([^{};]*)([;{}])/g, css = { block: [] }), css
}
// buildSass()
// readResult()
// getAllTemplatesPaths()


function clean(css) {
  return css
    .replace(/\/\*[\W\w]*?\*\//g, '') // remove comments
    .replace(/^\s+|\s+$/g, '') // remove trailing spaces
    .replace(/\s*([:;{}])\s*/g, '$1') // remove trailing separator spaces
    .replace(/\};+/g, '}') // remove unnecessary separators
    .replace(/([^:;{}])}/g, '$1;}') // add trailing separators
}

function refine(css, isBlock) {
  return /^@/.test(css) ? (css = css.split(' ')) && {
    'identifier': css.shift().substr(1).toLowerCase(),
    'parameters': css.join(' ')
  } : (isBlock ? /:$/ : /:/).test(css) ? (css = css.split(':')) && {
    'property': css.shift(),
    'value': css.join(':')
  } : css
}

function parse(css, regExp, object) {
  for (var m; (m = regExp.exec(css)) != null;) {
    if (m[2] == '{') object.block.push(object = {
      'selector': refine(m[1], true),
      'block': [],
      'parent': object
    })
    else if (m[2] == '}') object = object.parent
    else if (m[2] == ';') object.block.push(refine(m[1]))
  }
}

function readResult() {
  const css = readFileSync('css-result.css', 'utf-8')
  const minified = new minifyCss().minify(css)
  printFileSync(['css-result.min.css', minified.styles])

  // remove this block
  // const withoutBlocks = minified.styles.replace(/\{[^\{]*\}/g, '').replace(/\{[^\{]*\}/g, '').replace(/\{[^\{]*\}/g, '').replace(/\{[^\{]*\}/g, '')
  // console.log(parseCSS(minified.styles).block.map(i => i.selector))
  // printFileSync(['css-result-without-blocks.min.css', withoutBlocks])
  // const classes = minified.styles.match(/\.[a-z, \-, \:\:, A-Z, 0-9]*(?=[\{, \,, \., \:, \[])/g)

  const selectorsWithKeyframes = parseCSS(minified.styles).block.reduce((acc, obj) => {
    if (obj.selector) return acc.concat(obj.selector)
    console.log('NO SELECTOR', obj.selector)

    return acc
  }, [])

  const selectors = selectorsWithKeyframes.filter(i => !isObject(i))

  // console.log(selectors.map(s => s.split(' ')))
  const withoutChildSelector = uniq(selectors.reduce((acc, s) => {
    return [...acc, ...s.split(' ')]
  }))

  const withoutMultipleDefinitionSelector = uniq(withoutChildSelector.reduce((acc, s) => {
    return [...acc, ...s.split(',')]
  }))

  // console.log(withoutMultipleDefinitionSelector)


  const atLeastOneClass = withoutMultipleDefinitionSelector.reduce((acc, selector) => {

    const pointPositions = selector.split('').map((i, index) => i === '.' ? index : false).filter(a => _.isNumber(a))
    if (pointPositions.length === 0) return acc

    const temp = selector.split('.').map(i => '.' + i).slice(1).filter(i => i.length > 1)

    return [...acc, ...temp]
  }, [])

  const uniqClasses = uniq(atLeastOneClass)

  // console.log('classes', uniqClasses)

  const removeAfterChar = [
    ':',
    '[',
    '>',
    ')',
    '+',
    '~',
    '*'
  ]
  const classes2 = uniqClasses.reduce((acc, selector) => {
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

  // console.log(uniq(classes2))
  return uniq(classes2)
}

match()
function match() {
  var cssInSlim = JSON.parse(readFileSync('result.json', 'utf-8'))
  console.log('CSS in USE', Object.keys(cssInSlim).length)
  var css = readResult()
  console.log('CSS in TOTAL', css.length)

  const result = _.difference(css, Object.keys(cssInSlim).map(i => '.' + i))

  writeFileSync('final-result.json', JSON.stringify(result, null, 2))
}