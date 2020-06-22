const assert = require("assert");
const sinon = require("sinon");
const waitFor = require("../dist/waitFor").waitFor;
let clock;

describe("waitFor", function() {
  before(function() { clock = sinon.useFakeTimers(); });
  after(function() { clock.restore(); });

  it("should return a solved promise if the condition is already true", function() {
    return waitFor(function() { return true; });
  });

  it("should solve the promise once the condition has been met", function() {
    let   called = false;
    let   condition = false;
    const promise = waitFor(function() { return condition; }).then(function() {
      called = true;
    });

    clock.tick(500);
    assert.equal(called, false);
    condition = true;
    clock.tick(500);
    return promise;
  });

  it("should timeout if a timeout option has been specified", function() {
    let   called = false;
    let   timedout = false;
    const promise = waitFor(function() { return false; }, { timeout: 1000 }).then(function() {
      called = true;
    }).catch(() => {
      timedout = true;
    }).finally(() => {
      assert.equal(timedout, true);
    });

    clock.tick(500);
    assert.equal(timedout, false);
    clock.tick(1000);
    return promise;
  });
});
