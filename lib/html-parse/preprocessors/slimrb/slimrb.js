"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bluebird = _interopRequireDefault(require("bluebird"));

var _child_process = require("child_process");

var _glob = _interopRequireDefault(require("glob"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var globAsync = _bluebird.default.promisify(_glob.default);

var execAsync = _bluebird.default.promisify(_child_process.exec);

var SlimrbPreprocessor =
/*#__PURE__*/
function () {
  function SlimrbPreprocessor(_ref) {
    var basePath = _ref.basePath,
        glob = _ref.glob,
        _ref$logError = _ref.logError,
        logError = _ref$logError === void 0 ? true : _ref$logError;

    _classCallCheck(this, SlimrbPreprocessor);

    this.glob = glob;
    this.basePath = basePath;
    this.logError = logError;
  }

  _createClass(SlimrbPreprocessor, [{
    key: "compileAll",
    value: function compileAll() {
      var _this = this;

      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        onPathCompile: function onPathCompile(i) {
          return i;
        }
      },
          _ref2$onPathCompile = _ref2.onPathCompile,
          onPathCompile = _ref2$onPathCompile === void 0 ? function (i) {
        return i;
      } : _ref2$onPathCompile;

      this.errors = this.logError ? [] : null;

      var onPathCompileRawHtml = function onPathCompileRawHtml(result) {
        return _bluebird.default.resolve(onPathCompile(result)).then(function () {
          return result;
        });
      };

      return globAsync(this.glob, {
        cwd: this.basePath
      }).then(function (paths) {
        return _bluebird.default.map(paths, function (path) {
          return execAsync("slimrb ".concat(_this.basePath, "/").concat(path)).then(function (rawHtml) {
            return onPathCompileRawHtml({
              fullPath: "".concat(_this.basePath, "/").concat(path),
              rawHtml: rawHtml
            });
          }).catch(function (err) {
            return _this.errors && _this.errors.push({
              path: path,
              err: err
            });
          });
        }, {
          concurrency: 100
        });
      });
    }
  }]);

  return SlimrbPreprocessor;
}();

exports.default = SlimrbPreprocessor;