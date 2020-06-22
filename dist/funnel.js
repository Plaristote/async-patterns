"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.funnel = funnel;

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function funnel(object, method, interval) {
  var callback = object[method];

  callback.pendingCall = 0;
  callback.pendingArgv = [];
  object[method] = function () {
    var argvExists = false;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = callback.pendingArgv[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var argv = _step.value;

        if (argvExists = _underscore2.default.isEqual(argv, arguments)) {
          break;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (!argvExists) callback.pendingArgv.push(arguments);
    callback.pendingCall = new Date().getTime();
    setTimeout(function () {
      var timestamp = new Date().getTime();

      if (timestamp - callback.pendingCall >= interval) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = callback.pendingArgv[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var argv = _step2.value;

            callback.apply(object, argv);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        callback.pendingCall = 0;
        callback.pendingArgv = [];
      }
    }, interval);
  };
}