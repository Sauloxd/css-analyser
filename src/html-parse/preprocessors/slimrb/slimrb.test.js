import test from 'ava'
import Slimrb from './slimrb'

test('Slimrb should correctly compile .slim', t => {
  const preprocessor = new Slimrb({
    basePath: `${__dirname}/../../../../fixtures/slims`,
    glob: '**/*.slim',
    logError: false
  })
  const simpleSlimFileName = `${__dirname}/../../../../fixtures/slims/simple-view.slim`
  const simpleSlimRawHtml = '<h1 class="header">Im just a simple slim view!</h1><h2 class="sub-header">Foo Bar</h2>\n'
  const subjectSimpleSlim = preprocessor.compileAll()
    .then(results =>
      results.filter(({ fullPath: fileName }) =>
        fileName === simpleSlimFileName))

  return subjectSimpleSlim.then(result => t.deepEqual(result, [{
    fullPath: simpleSlimFileName,
    rawHtml: simpleSlimRawHtml
  }]))
})

test('Preprocessor should recursively find files', t => {
  const TOTAL_RECURSIVE_FILES_MANUALLY_COUNTED = 2
  const preprocessor = new Slimrb({
    basePath: `${__dirname}/../../../../fixtures`,
    glob: '**/*.slim',
    logError: false
  })

  return preprocessor.compileAll().then(result => t.is(result.length, TOTAL_RECURSIVE_FILES_MANUALLY_COUNTED))
})
