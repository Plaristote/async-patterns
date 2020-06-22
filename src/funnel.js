import _ from "underscore";

export function funnel(object, method, interval) {
  const callback = object[method];

  callback.pendingCall = 0;
  callback.pendingArgv = [];
  object[method] = function() {
    var argvExists = false;

    for (var argv of callback.pendingArgv) {
      if (argvExists = _.isEqual(argv, arguments)) {
        break ;
      }
    }
    if (!argvExists)
      callback.pendingArgv.push(arguments);
    callback.pendingCall = (new Date).getTime();
    setTimeout(function() {
      const timestamp = (new Date).getTime();

      if (timestamp - callback.pendingCall >= interval) {
        for (var argv of callback.pendingArgv)
          callback.apply(object, argv);
        callback.pendingCall = 0;
        callback.pendingArgv = [];
      }
    }, interval);
  };
}
