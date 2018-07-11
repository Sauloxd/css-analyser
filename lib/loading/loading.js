"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.persist = exports.fail = exports.succeed = exports.queueMessage = exports.start = void 0;

var _ora = _interopRequireDefault(require("ora"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var spinner = {
  stopAndPersist: function stopAndPersist() {
    return spinner;
  },
  start: function start() {
    return spinner;
  },
  fail: function fail() {
    return spinner;
  },
  succeed: function succeed() {
    return spinner;
  }
};

var start = function start() {
  return spinner = (0, _ora.default)('Css analysis started').start();
};

exports.start = start;

var queueMessage = function queueMessage(message) {
  return spinner.text = message;
};

exports.queueMessage = queueMessage;

var succeed = function succeed(message) {
  return spinner.succeed(message);
};

exports.succeed = succeed;

var fail = function fail(message) {
  return spinner.fail(message);
};

exports.fail = fail;

var persist = function persist() {
  spinner = spinner.stopAndPersist(arguments.length <= 0 ? undefined : arguments[0]);
  spinner.start('loading');
};

exports.persist = persist;