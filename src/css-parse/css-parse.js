import { preprocessorRetriever } from './preprocessors'
import { parseCss } from './parsers'

export const parse = userInput => {
  const { preprocessorType, entryPoint, includePaths } = userInput

  return precompileCss({ preprocessorType, entryPoint, includePaths })
    .then(({ css }) => parseCss(String(css)))
}

export const precompileCss = ({ preprocessorType, entryPoint, includePaths }) => {
  const Preprocessor = preprocessorRetriever(preprocessorType)

  return (new Preprocessor({
    entryPoint,
    includePaths
  })).compileAll()
}
