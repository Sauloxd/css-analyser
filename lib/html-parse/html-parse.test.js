"use strict";

var _ava = _interopRequireDefault(require("ava"));

var _difference = _interopRequireDefault(require("lodash/difference"));

var _htmlParse = require("./html-parse");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava.default)('should parse a correct raw HTML and return a correct cssTracker object', function (t) {
  var rawHtmlSubject = "\n    <div class=\"sibling1 sibling2 parent1\">\n      <div class=\"son\">\n        <a href=\"http://some.confusing.urls\" target=\"_blank\" class=\"link\">\n          <input type=\"email\" class=\"inputClass\"/>\n        </a>\n      </div>\n    </div>\n  ";
  return (0, _htmlParse.parseClasses)()({
    fullPath: 'path-to-file',
    rawHtml: rawHtmlSubject
  }).then(function (result) {
    return t.deepEqual(result, {
      sibling1: ['path-to-file'],
      sibling2: ['path-to-file'],
      parent1: ['path-to-file'],
      son: ['path-to-file'],
      link: ['path-to-file'],
      inputClass: ['path-to-file']
    });
  });
});
(0, _ava.default)('should eliminate same classes found in same raw HTML', function (t) {
  var rawHtmlSubject = "\n    <div class=\"sameClass\">\n      <div class=\"sameClass\">\n        <a href=\"http://some.confusing.urls\" target=\"_blank\" class=\"sameClass\">\n          <input type=\"email\" class=\"sameClass\"/>\n        </a>\n      </div>\n    </div>\n  ";
  return (0, _htmlParse.parseClasses)()({
    fullPath: 'path-to-file',
    rawHtml: rawHtmlSubject
  }).then(function (result) {
    return t.deepEqual(result, {
      sameClass: ['path-to-file']
    });
  });
});
(0, _ava.default)('should run return all classes for fixtures', function (t) {
  var subjectResultKeys = (0, _htmlParse.parse)({
    basePath: "".concat(__dirname, "/../../fixtures/slims"),
    glob: '**/*.slim'
  }).then(function (result) {
    return Object.keys(result);
  });
  return subjectResultKeys.then(function (result) {
    return t.is((0, _difference.default)(result, ['header', 'sub-header', 'qoolturestrap', 'qr-background', 'container-fluid', 'row', 'qr-section_spacing-bottom-md', 'col-xs-12', 'col-md-3', 'col-md-offset-1', 'qr-section', 'qr-section_spacing-bottom-sm', 'text-center', 'layout-t-sm', 'qr-button', 'qr-button_secondary', 'qr-button_small', 'col-md-7']).length, 0);
  });
});