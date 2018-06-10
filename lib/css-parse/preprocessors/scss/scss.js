"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodeSass = _interopRequireDefault(require("node-sass"));

var _bluebird = _interopRequireDefault(require("bluebird"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var sassRenderAsync = _bluebird.default.promisify(_nodeSass.default.render);

var Scss =
/*#__PURE__*/
function () {
  function Scss(_ref) {
    var entryPoint = _ref.entryPoint,
        includePaths = _ref.includePaths;

    _classCallCheck(this, Scss);

    this.entryPoint = entryPoint;
    this.includePaths = includePaths;
  }

  _createClass(Scss, [{
    key: "compileAll",
    value: function compileAll() {
      return sassRenderAsync({
        file: this.entryPoint,
        includePaths: this.includePaths
      });
    }
  }]);

  return Scss;
}();

exports.default = Scss;