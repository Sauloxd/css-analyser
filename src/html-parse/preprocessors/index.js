import * as Slim from './slimrb'
import * as Html from './html'

const preprocessors = [Slim, Html]

export function preprocessorRetriever(globs) {
  const preprocessorTypes = globs.split(',').map(glob => ({
    glob,
    preprocessor: preprocessors.find(p => p.TYPE === glob.split('.').pop()).default
  }))

  return preprocessorTypes
}