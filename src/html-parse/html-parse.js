import { preprocessorRetriever } from './preprocessors'
import { uniq, merge } from 'lodash'
const Promise = require('bluebird')
const htmlparser = require('htmlparser2')

export default function parseTemplates(userInput) {
  const { basePath, preprocessorType } = userInput
  const Preprocessor = preprocessorRetriever(preprocessorType)

  return getAllTemplatesPaths(Preprocessor, basePath)
}

export function getAllTemplatesPaths(Preprocessor, basePath) {
  const parsedClasses = {}

  return (new Preprocessor({ basePath, logError: true }))
    .compileAll({
      onPathCompile: parseClasses(classes => {
        merge(parsedClasses, classes)
      })
    })
    .then(() => parsedClasses)
}

export const parseClasses = (callback = i => i) => ({ fullPath, rawHtml }, stderr) => new Promise((resolve, reject) => {
  let classesTracker = {}

  const parser = new htmlparser.Parser({
    onopentag: (name, attr) => {
      if (attr.class) classesTracker = parseClassesOnTag(classesTracker, attr.class, () => fullPath)
    },
    onerror: () => reject(),
    onend: () => resolve(callback(classesTracker))
  })
  parser.write(rawHtml)
  parser.end()

  reject(stderr)
})

export const parseClassesOnTag = (tracker, cssClasses, infoSavedOnClass) =>
  cssClasses.split(' ').reduce((tracker, className) =>
    Object.assign(tracker, {
      [className]: uniq(((tracker[className] || []).concat(infoSavedOnClass(className))))
    }), tracker)
