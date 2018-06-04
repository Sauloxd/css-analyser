import test from 'ava'
import { TYPE as scssType } from './preprocessors/scss'
import { precompileCss, parseCss } from './css-parse'

test('Should correctly build sass', t => {
  const bootstrapEntryPoint = 'node_modules/bootstrap/scss/bootstrap.scss'
  const includePaths = []

  return t.notThrows(precompileCss({
    preprocessorType: scssType,
    entryPoint: bootstrapEntryPoint,
    includePaths
  }))
})

test('Should correctly parse css binary', t => {
  const bootstrapEntryPoint = 'node_modules/bootstrap/scss/bootstrap.scss'
  const includePaths = []

  precompileCss({
    preprocessorType: scssType,
    entryPoint: bootstrapEntryPoint,
    includePaths
  })
    .then(({ css }) => parseCss(css))
})