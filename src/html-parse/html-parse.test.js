import chai, { expect } from 'chai'
import chaisAsPromises from 'chai-as-promised'
import { parseClasses, default as parseTemplates } from './html-parse'
import { TYPE as slimrbType } from './preprocessors/slimrb'

chai.use(chaisAsPromises)

describe('Html parse', () => {
  describe('#parseClasses()', () => {
    it('should parse a correct raw HTML and return a correct cssTracker object', () => {
      const rawHtmlSubject = `
        <div class="sibling1 sibling2 parent1">
          <div class="son">
            <a href="http://some.confusing.urls" target="_blank" class="link">
              <input type="email" class="inputClass"/>
            </a>
          </div>
        </div>
      `

      const subject = parseClasses()({ fullPath: 'path-to-file', rawHtml: rawHtmlSubject })

      return expect(subject).to.eventually.deep.equal({
        sibling1:   [ 'path-to-file' ],
        sibling2:   [ 'path-to-file' ],
        parent1:    [ 'path-to-file' ],
        son:        [ 'path-to-file' ],
        link:       [ 'path-to-file' ],
        inputClass: [ 'path-to-file' ]
      })
    })

    it('should eliminate same classes found in same raw HTML', () => {
      const rawHtmlSubject = `
        <div class="sameClass">
          <div class="sameClass">
            <a href="http://some.confusing.urls" target="_blank" class="sameClass">
              <input type="email" class="sameClass"/>
            </a>
          </div>
        </div>
      `

      const subject = parseClasses()({ fullPath: 'path-to-file', rawHtml: rawHtmlSubject })

      return expect(subject).to.eventually.deep.equal({
        sameClass:   [ 'path-to-file' ]
      })
    })
  })

  describe('#parseTemplates()', () => {
    it('should run return all classes for fixtures', () => {
      const subjectResultKeys = parseTemplates({ basePath: `${__dirname}/../../fixtures/slims`, preprocessorType: slimrbType })
        .then(result => Object.keys(result))

      return expect(subjectResultKeys).to.eventually.deep.equal([
        'header',
        'sub-header',
        'qoolturestrap',
        'qr-background',
        'container-fluid',
        'row',
        'qr-section_spacing-bottom-md',
        'col-xs-12',
        'col-md-3',
        'col-md-offset-1',
        'qr-section',
        'qr-section_spacing-bottom-sm',
        'text-center',
        'layout-t-sm',
        'qr-button',
        'qr-button_secondary',
        'qr-button_small',
        'col-md-7'
      ])
    })
  })
})