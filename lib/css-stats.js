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
  return _bluebird.default.props({
    css: (0, _cssParse.default)(css),
    html: (0, _htmlParse.default)(html)
  }).then(function (_ref2) {
    var _ref2$css = _ref2.css,
        css = _ref2$css === void 0 ? [] : _ref2$css,
        _ref2$html = _ref2.html,
        html = _ref2$html === void 0 ? {} : _ref2$html;
    var classesDifference = (0, _difference.default)(css, Object.keys(html));
    (0, _fs.writeFileSync)('css-analyser__diff.log', JSON.stringify(classesDifference, null, 2), 'utf-8');
    console.log('Done! 🍌');
  }).catch(function (error) {
    return console.error(error);
  });
}