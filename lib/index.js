const process = require("process");
var addon = require("../native");

const ITERATIONS = 100000000;

const commands = {
  hello: () => addon.hello(),
  rust_single: () => addon.triangle_single(ITERATIONS),
  js: () =>
    [...new Array(ITERATIONS)]
      .map((i, idx) => idx)
      .reduce((sum, i) => sum + i, 0),
};

const res = commands[process.argv[2]]();
console.log(res);
