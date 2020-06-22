"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.funnel = exports.waitFor = undefined;

var _waitFor = require("./waitFor");

var A = _interopRequireWildcard(_waitFor);

var _funnel = require("./funnel");

var B = _interopRequireWildcard(_funnel);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var waitFor = exports.waitFor = A.waitFor;
var funnel = exports.funnel = B.funnel;