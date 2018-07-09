"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bluebird = _interopRequireDefault(require("bluebird"));

var _child_process = require("child_process");

var _glob = _interopRequireDefault(require("glob"));

var loading = _interopRequireWildcard(require("../../../loading"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var globAsync = _bluebird.default.promisify(_glob.default);

var execAsync = _bluebird.default.promisify(_child_process.exec);

var HtmlPreprocessor =
/*#__PURE__*/
function () {
  function HtmlPreprocessor(_ref) {
    var basePath = _ref.basePath,
        glob = _ref.glob,
        _ref$logError = _ref.logError,
        logError = _ref$logError === void 0 ? true : _ref$logError;

    _classCallCheck(this, HtmlPreprocessor);

    this.glob = glob;
    this.basePath = basePath;
    this.logError = logError;
  }

  _createClass(HtmlPreprocessor, [{
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

      loading.queueMessage('Parsing HTML files');
      return globAsync(this.glob, {
        cwd: this.basePath
      }).then(function (paths) {
        var i = 1;
        return _bluebird.default.map(paths, function (path) {
          return execAsync("cat ".concat(_this.basePath, "/").concat(path)).then(function (rawHtml) {
            return onPathCompileRawHtml({
              fullPath: "".concat(_this.basePath, "/").concat(path),
              rawHtml: rawHtml
            });
          }).tap(function () {
            return loading.queueMessage("".concat(i++, " / ").concat(paths.length, " (").concat(path.split('/').pop(), ")"));
          }).catch(function (err) {
            return _this.errors && _this.errors.push({
              path: path,
              err: err
            });
          });
        }, {
          concurrency: 10
        }).tap(function () {
          return loading.persist({
            symbol: '🤙',
            text: "Parsed ".concat(paths.length, " html files")
          });
        });
      });
    }
  }]);

  return HtmlPreprocessor;
}();

exports.default = HtmlPreprocessor;