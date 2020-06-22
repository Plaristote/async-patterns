"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitFor = waitFor;
function waitFor(condition, opts) {
  opts = opts || {};
  var timeout = opts.timeout;
  var interval = opts.interval || 500;
  var currentWait = 0;
  var _checkCondition;

  _checkCondition = function checkCondition(resolve, reject) {
    if (condition()) resolve();else if (!timeout || currentWait < timeout) {
      currentWait += interval;
      setTimeout(function () {
        _checkCondition(resolve, reject);
      }, interval);
    } else reject(new Error("condition timed out: " + condition.toString()));
  };
  return new Promise(function (resolve, reject) {
    _checkCondition(resolve, reject);
  });
}