"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.precompileCss = exports.parse = void 0;

var _preprocessors = require("./preprocessors");

var _parsers = require("./parsers");

var parse = function parse(userInput) {
  var preprocessorType = userInput.preprocessorType,
      entryPoint = userInput.entryPoint,
      includePaths = userInput.includePaths;
  return precompileCss({
    preprocessorType: preprocessorType,
    entryPoint: entryPoint,
    includePaths: includePaths
  }).then(_parsers.parseCss);
};

exports.parse = parse;

var precompileCss = function precompileCss(_ref) {
  var preprocessorType = _ref.preprocessorType,
      entryPoint = _ref.entryPoint,
      includePaths = _ref.includePaths;
  var Preprocessor = (0, _preprocessors.preprocessorRetriever)(preprocessorType);
  return new Preprocessor({
    entryPoint: entryPoint,
    includePaths: includePaths
  }).compileAll();
};

exports.precompileCss = precompileCss;