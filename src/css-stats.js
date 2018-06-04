import cssClassParse from './css-parse'
import htmlClassParse from './html-parse'

function unusedClasses(userInput) {
  Promise.all([
    cssClassParse(userInput),
    htmlClassParse(userInput)
  ])
    .then(([ css, html ]) => {
      console.log('------HTML-----')
      console.log(Object.keys(html))
      console.log('------CSS------')
      console.log(css)
    })
}