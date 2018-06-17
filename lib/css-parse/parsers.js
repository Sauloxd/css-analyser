"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refine = exports.parse = exports.addTrailingSeparators = exports.removeUnnecessarySeparators = exports.removeTrailingSeparatorSpaces = exports.removeTrailingSpaces = exports.removeComments = exports.clean = exports.removeDotNotation = exports.ignoreAfterSpecialSelectors = exports.normalizeSiblingSelector = exports.normalizeMultipleDefinitionSelector = exports.normalizeChildSelector = exports.cleanNotObjectSelectors = exports.concatSelectors = exports.parseCss = void 0;

var _flow = _interopRequireDefault(require("lodash/fp/flow"));

var _get = _interopRequireDefault(require("lodash/fp/get"));

var _map = _interopRequireDefault(require("lodash/fp/map"));

var _reduce = _interopRequireDefault(require("lodash/fp/reduce"));

var _filter = _interopRequireDefault(require("lodash/fp/filter"));

var _isObject = _interopRequireDefault(require("lodash/isObject"));

var _uniq = _interopRequireDefault(require("lodash/uniq"));

var _isNumber = _interopRequireDefault(require("lodash/isNumber"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var parseCss = function parseCss(rawCss) {
  return (0, _flow.default)([clean, parse(/([^{};]*)([;{}])/g, {
    block: []
  }), (0, _get.default)('block'), concatSelectors, cleanNotObjectSelectors, normalizeMultipleDefinitionSelector, normalizeChildSelector, normalizeSiblingSelector, ignoreAfterSpecialSelectors, removeDotNotation, _uniq.default])(rawCss);
};

exports.parseCss = parseCss;
var concatSelectors = (0, _reduce.default)(function (acc, obj) {
  return acc.concat(obj.selector || []);
}, []);
exports.concatSelectors = concatSelectors;
var cleanNotObjectSelectors = (0, _filter.default)(function (selector) {
  return !(0, _isObject.default)(selector);
});
exports.cleanNotObjectSelectors = cleanNotObjectSelectors;
var normalizeChildSelector = (0, _reduce.default)(function (acc, s) {
  return _toConsumableArray(acc).concat(_toConsumableArray(s.split(' ')));
}, []);
exports.normalizeChildSelector = normalizeChildSelector;
var normalizeMultipleDefinitionSelector = (0, _reduce.default)(function (acc, s) {
  return _toConsumableArray(acc).concat(_toConsumableArray(s.split(',')));
}, []);
exports.normalizeMultipleDefinitionSelector = normalizeMultipleDefinitionSelector;
var normalizeSiblingSelector = (0, _reduce.default)(function (acc, selector) {
  var pointPositions = selector.split('').map(function (i, index) {
    return i === '.' ? index : false;
  }).filter(function (a) {
    return (0, _isNumber.default)(a);
  });
  if (pointPositions.length === 0) return acc;
  var temp = selector.split('.').map(function (i) {
    return '.' + i;
  }).slice(1).filter(function (i) {
    return i.length > 1;
  });
  return _toConsumableArray(acc).concat(_toConsumableArray(temp));
}, []);
exports.normalizeSiblingSelector = normalizeSiblingSelector;
var removeAfterChar = [':', '[', '>', ')', '+', '~', '*'];
var ignoreAfterSpecialSelectors = (0, _reduce.default)(function (acc, selector) {
  var removeAfterIndex = removeAfterChar.map(function (char) {
    return selector.indexOf(char);
  }).filter(function (i) {
    return i !== -1;
  }).sort(function (a, b) {
    return a - b;
  })[0];

  if (removeAfterIndex) {
    // console.log(`selector: ${selector}, i: ${removeAfterIndex}`)
    return acc.concat(selector.slice(0, removeAfterIndex));
  }

  return acc.concat(selector);
}, []);
exports.ignoreAfterSpecialSelectors = ignoreAfterSpecialSelectors;
var removeDotNotation = (0, _map.default)(function (selector) {
  return selector.replace('.', '');
});
exports.removeDotNotation = removeDotNotation;

var clean = function clean(css) {
  return (0, _flow.default)([removeComments, removeTrailingSpaces, removeTrailingSeparatorSpaces, removeUnnecessarySeparators, addTrailingSeparators])(css);
};

exports.clean = clean;

var removeComments = function removeComments(css) {
  return css.replace(/\/\*[\W\w]*?\*\//g, '');
};

exports.removeComments = removeComments;

var removeTrailingSpaces = function removeTrailingSpaces(css) {
  return css.replace(/^\s+|\s+$/g, '');
};

exports.removeTrailingSpaces = removeTrailingSpaces;

var removeTrailingSeparatorSpaces = function removeTrailingSeparatorSpaces(css) {
  return css.replace(/\s*([:;{}])\s*/g, '$1');
};

exports.removeTrailingSeparatorSpaces = removeTrailingSeparatorSpaces;

var removeUnnecessarySeparators = function removeUnnecessarySeparators(css) {
  return css.replace(/\};+/g, '}');
};

exports.removeUnnecessarySeparators = removeUnnecessarySeparators;

var addTrailingSeparators = function addTrailingSeparators(css) {
  return css.replace(/([^:;{}])}/g, '$1;}');
};

exports.addTrailingSeparators = addTrailingSeparators;

var parse = function parse(regExp, object) {
  return function (css) {
    for (var m; (m = regExp.exec(css)) != null;) {
      if (m[2] == '{') object.block.push(object = {
        'selector': refine(m[1], true),
        'block': [],
        'parent': object
      });else if (m[2] == '}') object = object.parent;else if (m[2] == ';') object.block.push(refine(m[1]));
    }

    return object;
  };
};

exports.parse = parse;

var refine = function refine(css, isBlock) {
  return /^@/.test(css) ? (css = css.split(' ')) && {
    'identifier': css.shift().substr(1).toLowerCase(),
    'parameters': css.join(' ')
  } : (isBlock ? /:$/ : /:/).test(css) ? (css = css.split(':')) && {
    'property': css.shift(),
    'value': css.join(':')
  } : css;
};

exports.refine = refine;