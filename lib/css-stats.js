"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = diffClasses;

var _difference = _interopRequireDefault(require("lodash/difference"));

var _cssParse = _interopRequireDefault(require("./css-parse"));

var _htmlParse = _interopRequireDefault(require("./html-parse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function diffClasses(_ref) {
  var css = _ref.css,
      html = _ref.html;
  return Promise.all({
    css: (0, _cssParse.default)(css),
    html: (0, _htmlParse.default)(html)
  }).then(function (_ref2) {
    var _ref2$css = _ref2.css,
        css = _ref2$css === void 0 ? [] : _ref2$css,
        _ref2$html = _ref2.html,
        html = _ref2$html === void 0 ? {} : _ref2$html;
    console.log('html', css);
    console.log((0, _difference.default)(css, Object.keys(html)));
    console.log('finished');
  }).catch(function (error) {
    return console.error(error);
  });
}