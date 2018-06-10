"use strict";

var _ava = _interopRequireDefault(require("ava"));

var _scss = require("./preprocessors/scss");

var _cssParse = require("./css-parse");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava.default)('Should correctly build sass', function (t) {
  var bootstrapEntryPoint = 'node_modules/bootstrap/scss/bootstrap.scss';
  var includePaths = [];
  return t.notThrows((0, _cssParse.precompileCss)({
    preprocessorType: _scss.TYPE,
    entryPoint: bootstrapEntryPoint,
    includePaths: includePaths
  }));
});
(0, _ava.default)('Should correctly parse css binary', function (t) {
  var bootstrapEntryPoint = 'node_modules/bootstrap/scss/bootstrap.scss';
  var includePaths = [];
  (0, _cssParse.precompileCss)({
    preprocessorType: _scss.TYPE,
    entryPoint: bootstrapEntryPoint,
    includePaths: includePaths
  }).then(function (_ref) {
    var css = _ref.css;
    return (0, _cssParse.parseCss)(css);
  });
});