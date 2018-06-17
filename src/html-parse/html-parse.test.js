import test from 'ava'
import difference from 'lodash/difference'
import { parseClasses, parse } from './html-parse'

test('should parse a correct raw HTML and return a correct cssTracker object', t => {
  const rawHtmlSubject = `
    <div class="sibling1 sibling2 parent1">
      <div class="son">
        <a href="http://some.confusing.urls" target="_blank" class="link">
          <input type="email" class="inputClass"/>
        </a>
      </div>
    </div>
  `

  return parseClasses()({ fullPath: 'path-to-file', rawHtml: rawHtmlSubject })
    .then(result => t.deepEqual(result, {
      sibling1:   [ 'path-to-file' ],
      sibling2:   [ 'path-to-file' ],
      parent1:    [ 'path-to-file' ],
      son:        [ 'path-to-file' ],
      link:       [ 'path-to-file' ],
      inputClass: [ 'path-to-file' ]
    }))
})

test('should eliminate same classes found in same raw HTML', t => {
  const rawHtmlSubject = `
    <div class="sameClass">
      <div class="sameClass">
        <a href="http://some.confusing.urls" target="_blank" class="sameClass">
          <input type="email" class="sameClass"/>
        </a>
      </div>
    </div>
  `

  return parseClasses()({ fullPath: 'path-to-file', rawHtml: rawHtmlSubject })
    .then(result => t.deepEqual(result, {
      sameClass: [ 'path-to-file' ]
    }))
})

test('should run return all classes for fixtures', t => {
  const subjectResultKeys = parse({ basePath: `${__dirname}/../../fixtures/slims`, glob: '**/*.slim' })
    .then(result => Object.keys(result))

  return subjectResultKeys.then(result => t.is(difference(result, [
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
  ]).length, 0))
})