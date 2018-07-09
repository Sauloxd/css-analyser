"use strict";

var _ava = _interopRequireDefault(require("ava"));

var _html = _interopRequireDefault(require("./html"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava.default)('Html should correctly compile .html', function (t) {
  var preprocessor = new _html.default({
    basePath: "".concat(__dirname, "/../../../../fixtures/htmls"),
    glob: '**/*.html',
    logError: false
  });
  var simpleHtmlFileName = "".concat(__dirname, "/../../../../fixtures/htmls/simple-view.html");
  var simpleRawHtml = '<h1 class="header">Im just a simple slim view!</h1><h2 class="sub-header">Foo Bar</h2>';
  var subjectSimpleHtml = preprocessor.compileAll().then(function (results) {
    return results.filter(function (_ref) {
      var fileName = _ref.fullPath;
      return fileName === simpleHtmlFileName;
    });
  });
  return subjectSimpleHtml.then(function (result) {
    return t.deepEqual(result, [{
      fullPath: simpleHtmlFileName,
      rawHtml: simpleRawHtml
    }]);
  });
});