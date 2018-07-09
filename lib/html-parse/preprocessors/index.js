"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preprocessorRetriever = preprocessorRetriever;

var Slim = _interopRequireWildcard(require("./slimrb"));

var Html = _interopRequireWildcard(require("./html"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var preprocessors = [Slim, Html];

function preprocessorRetriever(globs) {
  var preprocessorTypes = globs.split(',').map(function (glob) {
    return {
      glob: glob,
      preprocessor: preprocessors.find(function (p) {
        return p.TYPE === glob.split('.').pop();
      }).default
    };
  });
  return preprocessorTypes;
}