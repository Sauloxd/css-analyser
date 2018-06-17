"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.precompileCss = exports.parse = void 0;

var _preprocessors = require("./preprocessors");

var _parsers = require("./parsers");

var parse = function parse(userInput) {
  var entryPoint = userInput.entryPoint,
      includePaths = userInput.includePaths;
  var preprocessorType = entryPoint.split('.').pop();
  return precompileCss({
    preprocessorType: preprocessorType,
    entryPoint: entryPoint,
    includePaths: includePaths
  }).then(function (_ref) {
    var css = _ref.css;
    return (0, _parsers.parseCss)(String(css));
  });
};

exports.parse = parse;

var precompileCss = function precompileCss(_ref2) {
  var preprocessorType = _ref2.preprocessorType,
      entryPoint = _ref2.entryPoint,
      includePaths = _ref2.includePaths;
  var Preprocessor = (0, _preprocessors.preprocessorRetriever)(preprocessorType);
  return new Preprocessor({
    entryPoint: entryPoint,
    includePaths: includePaths
  }).compileAll();
};

exports.precompileCss = precompileCss;