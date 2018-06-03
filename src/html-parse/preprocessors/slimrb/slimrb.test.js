import { expect } from 'chai'
import Slimrb from './slimrb'

describe('Slimrb preprocessor class', () => {
  describe('#compileAll', () => {
    it('should correctly compile simple slim', () => {
      const preprocessor = new Slimrb({
        basePath: `${__dirname}/../../../../fixtures/slims`,
        logError: false
      })
      const simpleSlimFileName = `${__dirname}/../../../../fixtures/slims/simple-view.slim`
      const simpleSlimRawHtml = '<h1 class="header">Im just a simple slim view!</h1><h2 class="sub-header">Foo Bar</h2>\n'
      const subjectSimpleSlim = preprocessor.compileAll()
        .then(results =>
          results.filter(({ fullPath: fileName }) =>
            fileName === simpleSlimFileName))

      return expect(subjectSimpleSlim).to.eventually.deep.equal([{
        fullPath: simpleSlimFileName,
        rawHtml: simpleSlimRawHtml
      }])
    })

    it('should recursively compile all extesion files', () => {
      const TOTAL_RECURSIVE_FILES_MANUALLY_COUNTED = 2
      const preprocessor = new Slimrb({
        basePath: `${__dirname}/../../../../fixtures`,
        logError: false
      })

      return expect(preprocessor.compileAll()).to.eventually.have.length(TOTAL_RECURSIVE_FILES_MANUALLY_COUNTED)
    })
  })
})