import * as Scss from './scss'

const preprocessors = [Scss]

export function preprocessorRetriever(type) {
  const preprocessor = preprocessors
    .find(preprocessor => preprocessor.TYPE === type)

  if (!preprocessor) throw new Error('Invalid preprocessor type! 😔 => ', type)

  return preprocessor.default
}