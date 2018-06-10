import difference from 'lodash/difference'
import cssClassParse from './css-parse'
import htmlClassParse from './html-parse'

const subjectPath = '/Users/saulofuruta/QultureRocks/qultureapp'
const cssPath = `${subjectPath}/app/assets/stylesheets`
const slimPath = `${subjectPath}/app`

const userInput = {
  css: {
    preprocessorType: 'scss',
    entryPoint: cssPath + '/application.scss',
    includePaths: [
      subjectPath + '/node_modules',
      subjectPath + '/vendor/assets/bower_components'
    ]
  },
  html: {
    preprocessorType: 'slimrb',
    basePath: slimPath
  }
}

unusedClasses(userInput)

function unusedClasses({ css, html }) {
  Promise.all([
    cssClassParse(css),
    htmlClassParse(html)
  ])
    .then(([ css, html ]) => {
      console.log(difference(css, Object.keys(html)))
      console.log('finished 🕶')
    })
    .catch(error => console.error(error))
}
