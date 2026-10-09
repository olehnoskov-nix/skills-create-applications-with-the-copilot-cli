#!/usr/bin/env node
'use strict';

// Supported operations: addition (+), subtraction (-), multiplication (*), and division (/).
function calculate(operation, left, right) {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new Error('Operands must be finite numbers.');
  }

  switch (operation) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case '*':
      return left * right;
    case '/':
      if (right === 0) {
        throw new Error('Cannot divide by zero.');
      }
      return left / right;
    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }
}

function main(args) {
  if (args.length !== 3) {
    throw new Error('Usage: node src/calculator.js <+|-|*|/> <number> <number>');
  }

  const [operation, leftInput, rightInput] = args;
  const left = Number(leftInput);
  const right = Number(rightInput);

  if (leftInput.trim() === '' || rightInput.trim() === '') {
    throw new Error('Operands must be finite numbers.');
  }

  console.log(calculate(operation, left, right));
}

if (require.main === module) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { calculate };
