"use strict";

var _ava = _interopRequireDefault(require("ava"));

var _slimrb = _interopRequireDefault(require("./slimrb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava.default)('Slimrb should correctly compile .slim', function (t) {
  var preprocessor = new _slimrb.default({
    basePath: "".concat(__dirname, "/../../../../fixtures/slims"),
    logError: false
  });
  var simpleSlimFileName = "".concat(__dirname, "/../../../../fixtures/slims/simple-view.slim");
  var simpleSlimRawHtml = '<h1 class="header">Im just a simple slim view!</h1><h2 class="sub-header">Foo Bar</h2>\n';
  var subjectSimpleSlim = preprocessor.compileAll().then(function (results) {
    return results.filter(function (_ref) {
      var fileName = _ref.fullPath;
      return fileName === simpleSlimFileName;
    });
  });
  return subjectSimpleSlim.then(function (result) {
    return t.deepEqual(result, [{
      fullPath: simpleSlimFileName,
      rawHtml: simpleSlimRawHtml
    }]);
  });
});
(0, _ava.default)('Preprocessor should recursively find files', function (t) {
  var TOTAL_RECURSIVE_FILES_MANUALLY_COUNTED = 2;
  var preprocessor = new _slimrb.default({
    basePath: "".concat(__dirname, "/../../../../fixtures"),
    logError: false
  });
  return preprocessor.compileAll().then(function (result) {
    return t.is(result.length, TOTAL_RECURSIVE_FILES_MANUALLY_COUNTED);
  });
});