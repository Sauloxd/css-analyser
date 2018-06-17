"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _commander = _interopRequireDefault(require("commander"));

var _cssStats = _interopRequireDefault(require("../css-stats"));

var _package = require("../../package.json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander.default.version(_package.version);

_commander.default.command('difference').alias('diff').description('log a diff of used classes in view and declared classes in style').option('--base-path <path>', 'specify the root project path').option('--style-includes <path> [paths...]', 'specify where sass can try to resolve from, usually node_modules libs', function (val, memo) {
  memo.push(val);
  return memo;
}, []).option('-s, --style <file>', 'specify the input file for stylesheet').option('-v, --view <blob>', 'set a blob to where the classes exists').option('--view-path <path>', 'where to apply blob to').option('-p, --print', 'if should print to screen').action(function (_ref) {
  var _ref$basePath = _ref.basePath,
      basePath = _ref$basePath === void 0 ? _path.default.resolve('.') : _ref$basePath,
      styleIncludes = _ref.styleIncludes,
      style = _ref.style,
      view = _ref.view;
  return (0, _cssStats.default)({
    css: {
      entryPoint: _path.default.resolve(basePath, style),
      includePaths: styleIncludes.map(function (p) {
        return _path.default.resolve(basePath, p);
      }) || []
    },
    html: {
      basePath: _path.default.resolve(basePath),
      glob: view
    }
  });
}).on('--help', function () {
  console.log('\n  Examples:');
  console.log("\n    $ css-analyser diff /\n        --base-path /Users/saulofuruta/QultureRocks/qultureapp /\n        --style ./app/assets/stylesheets/application.scss /\n        --style-includes ./node_modules /\n        --style-includes ./vendor/assets/bower_components /\n        --view app/**/*.slim /\n    ");
});

var _default = function _default(process) {
  return _commander.default.parse(process.argv);
};

exports.default = _default;