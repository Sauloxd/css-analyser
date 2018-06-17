"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;
exports.getAllTemplatesPaths = getAllTemplatesPaths;
exports.parseClassesOnTag = exports.parseClasses = void 0;

var _preprocessors = require("./preprocessors");

var _uniq = _interopRequireDefault(require("lodash/uniq"));

var _merge = _interopRequireDefault(require("lodash/merge"));

var _bluebird = _interopRequireDefault(require("bluebird"));

var _htmlparser = _interopRequireDefault(require("htmlparser2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function parse(userInput) {
  var basePath = userInput.basePath,
      glob = userInput.glob;
  var preprocessorType = glob.split('.').pop();
  var Preprocessor = (0, _preprocessors.preprocessorRetriever)(preprocessorType);
  return getAllTemplatesPaths(Preprocessor, glob, basePath);
}

function getAllTemplatesPaths(Preprocessor, glob, basePath) {
  var parsedClasses = {};
  return new Preprocessor({
    basePath: basePath,
    glob: glob,
    logError: true
  }).compileAll({
    onPathCompile: parseClasses(function (classes) {
      (0, _merge.default)(parsedClasses, classes);
    })
  }).then(function () {
    return parsedClasses;
  });
}

var parseClasses = function parseClasses() {
  var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (i) {
    return i;
  };
  return function (_ref, stderr) {
    var fullPath = _ref.fullPath,
        rawHtml = _ref.rawHtml;
    return new _bluebird.default(function (resolve, reject) {
      var classesTracker = {};
      var parser = new _htmlparser.default.Parser({
        onopentag: function onopentag(name, attr) {
          if (attr.class) classesTracker = parseClassesOnTag(classesTracker, attr.class, function () {
            return fullPath;
          });
        },
        onerror: function onerror() {
          return reject();
        },
        onend: function onend() {
          return resolve(callback(classesTracker));
        }
      });
      parser.write(rawHtml);
      parser.end();
      reject(stderr);
    });
  };
};

exports.parseClasses = parseClasses;

var parseClassesOnTag = function parseClassesOnTag(tracker, cssClasses, infoSavedOnClass) {
  return cssClasses.split(' ').reduce(function (tracker, className) {
    return Object.assign(tracker, _defineProperty({}, className, (0, _uniq.default)((tracker[className] || []).concat(infoSavedOnClass(className)))));
  }, tracker);
};

exports.parseClassesOnTag = parseClassesOnTag;