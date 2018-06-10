import * as Slim from './slimrb'

const preprocessors = [Slim]

export function preprocessorRetriever(type) {
  const preprocessor = preprocessors
    .find(preprocessor => preprocessor.TYPE === type)

  if (!preprocessor) throw new Error('Invalid preprocessor type! 😔 => ', type)

  return preprocessor.default
}