const process = require("process");
var addon = require("../native");

const ITERATIONS = 100000000;

const cmd = process.argv[2];

function* range(a, b, step) {
  switch (arguments.length) {
    case 0:
      return;
    case 1:
      b = Number(a);
      a = 0;
      step = 1;
      break;
    case 2:
      a = Number(a);
      b = Number(b);
      step = a < b ? +1 : -1;
      break;
    case 3:
      a = Number(a);
      b = Number(b);
      step = Number(step);
      break;
  }

  if (Number.isNaN(a) || Number.isNaN(b) || Number.isNaN(step)) return;

  if (a === b || !step) return;

  if (a < b) {
    if (step < 0) return;
    while (a < b) {
      yield a;
      a += step;
    }
  }

  if (a > b) {
    if (step > 0) return;
    while (a > b) {
      yield a;
      a += step;
    }
  }
}

const js_commands = {
  js_triangle_array: () =>
    [...new Array(ITERATIONS)]
      .map((i, idx) => idx)
      .reduce((sum, i) => sum + i, 0),
  js_triangle_generator: () => {
    let sum = 0;
    for (const i of range(0, ITERATIONS, 1)) {
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
