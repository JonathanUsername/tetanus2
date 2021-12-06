const process = require("process");
const addon = require("../native");
const { rangeGenerator } = require("./utils");

const ITERATIONS = 100000000;

const cmd = process.argv[2];

const js_commands = {
  js_triangle_array: () =>
    [...new Array(ITERATIONS)]
      .map((i, idx) => idx)
      .reduce((sum, i) => sum + i, 0),
  js_triangle_generator: () => {
    let sum = 0;
    for (const i of rangeGenerator(0, ITERATIONS, 1)) {
      sum += i;
    }
    return sum;
  },
};

let ret;
if (cmd in addon) {
  ret = addon[cmd](ITERATIONS);
} else if (cmd in js_commands) {
  ret = js_commands[cmd]();
} else {
  console.error("Unknown command!");
  process.exit(1);
}

console.log(ret);
