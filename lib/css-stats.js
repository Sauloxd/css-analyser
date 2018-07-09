"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = diffClasses;

var _bluebird = _interopRequireDefault(require("bluebird"));

var _difference = _interopRequireDefault(require("lodash/difference"));

var _cssParse = _interopRequireDefault(require("./css-parse"));

var _htmlParse = _interopRequireDefault(require("./html-parse"));

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function diffClasses(_ref) {
  var css = _ref.css,
      html = _ref.html;
  var parsedCss = [],
      parsedHtml = {};
  return (0, _cssParse.default)(css).then(function (cssResult) {
    return parsedCss = cssResult;
  }).then(function () {
    return (0, _htmlParse.default)(html);
  }).then(function (htmlResult) {
    return parsedHtml = htmlResult;
  }).then(function () {
    var classesDifference = (0, _difference.default)(parsedCss, Object.keys(parsedHtml));
    (0, _fs.writeFileSync)('css-analyser__diff.log', JSON.stringify(classesDifference, null, 2), 'utf-8');
  }).catch(function (error) {
    return console.error(error);
  });
}