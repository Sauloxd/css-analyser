import Promise from 'bluebird'
import difference from 'lodash/difference'
import cssClassParse from './css-parse'
import htmlClassParse from './html-parse'
import { writeFileSync } from 'fs'

export default function diffClasses({ css, html }) {
  let parsedCss = [], parsedHtml = {}

  return cssClassParse(css)
    .then(cssResult => parsedCss = cssResult)
    .then(() => htmlClassParse(html))
    .then(htmlResult => parsedHtml = htmlResult)
    .then(() => {
      const classesDifference = difference(parsedCss, Object.keys(parsedHtml))
      writeFileSync('css-analyser__diff.log', JSON.stringify(classesDifference, null, 2), 'utf-8')
    })
    .catch(error => console.error(error))
}
