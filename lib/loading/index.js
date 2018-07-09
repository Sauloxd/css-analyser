"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loading = require("./loading");

Object.keys(_loading).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _loading[key];
    }
  });
});