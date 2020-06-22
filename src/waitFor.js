export function waitFor(condition, opts) {
  opts = opts || {};
  const timeout = opts.timeout;
  const interval = opts.interval || 500;
  var currentWait = 0;
  var checkCondition;

  checkCondition = function(resolve, reject) {
    if (condition())
      resolve();
    else if (!timeout || currentWait < timeout) {
      currentWait += interval;
      setTimeout(function() { checkCondition(resolve, reject); }, interval);
    }
    else
      reject(new Error("condition timed out: " + condition.toString()));
  };
  return new Promise((resolve, reject) => {
    checkCondition(resolve, reject);
  });
}
