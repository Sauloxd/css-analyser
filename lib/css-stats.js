"use strict";

var _cssParse = _interopRequireDefault(require("./css-parse"));

var _htmlParse = _interopRequireDefault(require("./html-parse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var subjectPath = '/Users/saulofuruta/QultureRocks/qultureapp';
var cssPath = "".concat(subjectPath, "/app/assets/stylesheets");
var slimPath = "".concat(subjectPath, "/app");
var userInput = {
  css: {
    preprocessorType: 'scss',
    entryPoint: cssPath + '/application.scss',
    includePaths: [subjectPath + '/node_modules', subjectPath + '/vendor/assets/bower_components']
  },
  html: {
    preprocessorType: 'slimrb',
    basePath: slimPath
  }
};
unusedClasses(userInput);

function unusedClasses(_ref) {
  var css = _ref.css,
      html = _ref.html;
  Promise.all([(0, _cssParse.default)(css), (0, _htmlParse.default)(html)]).then(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        css = _ref3[0],
        html = _ref3[1];

    console.log('------HTML-----');
    console.log(Object.keys(html));
    console.log('------CSS------');
    console.log(css);
  });
}