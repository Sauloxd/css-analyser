"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preprocessorRetriever = preprocessorRetriever;

var Scss = _interopRequireWildcard(require("./scss"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var preprocessors = [Scss];

function preprocessorRetriever(type) {
  var preprocessor = preprocessors.find(function (preprocessor) {
    return preprocessor.TYPE === type;
  });
  if (!preprocessor) throw new Error('Invalid preprocessor type! 😔 => ', type);
  return preprocessor.default;
}