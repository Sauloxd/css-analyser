import Promise from 'bluebird'
import difference from 'lodash/difference'
import cssClassParse from './css-parse'
import htmlClassParse from './html-parse'
import { writeFileSync } from 'fs'

export default function diffClasses({ css, html }) {
  return Promise.props({
    css: cssClassParse(css),
    html: htmlClassParse(html)
  })
    .then(({ css = [], html = {} }) => {
      const classesDifference = difference(css, Object.keys(html))
      writeFileSync('css-analyser__diff.log', JSON.stringify(classesDifference, null, 2), 'utf-8')
      console.log('Done! 🍌')
    })
    .catch(error => console.error(error))
}
