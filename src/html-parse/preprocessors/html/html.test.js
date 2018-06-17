import test from 'ava'
import Html from './html'

test('Html should correctly compile .html', t => {
  const preprocessor = new Html({
    basePath: `${__dirname}/../../../../fixtures/htmls`,
    glob: '**/*.html',
    logError: false
  })
  const simpleHtmlFileName = `${__dirname}/../../../../fixtures/htmls/simple-view.html`
  const simpleRawHtml = '<h1 class="header">Im just a simple slim view!</h1><h2 class="sub-header">Foo Bar</h2>'
  const subjectSimpleHtml = preprocessor.compileAll()
    .then(results =>
      results.filter(({ fullPath: fileName }) =>
        fileName === simpleHtmlFileName))

  return subjectSimpleHtml.then(result => t.deepEqual(result, [{
    fullPath: simpleHtmlFileName,
    rawHtml: simpleRawHtml
  }]))
})
