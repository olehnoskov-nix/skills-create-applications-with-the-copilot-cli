#!/usr/bin/env node
'use strict';

function validateOperand(operand) {
  if (!Number.isFinite(operand)) {
    throw new Error('Operands must be finite numbers.');
  }
}

function modulo(a, b) {
  validateOperand(a);
  validateOperand(b);
  if (b === 0) {
    throw new Error('Cannot divide by zero.');
  }
  return a % b;
}

function power(base, exponent) {
  validateOperand(base);
  validateOperand(exponent);
  return base ** exponent;
}

function squareRoot(n) {
  validateOperand(n);
  if (n < 0) {
    throw new Error('Cannot calculate the square root of a negative number.');
  }
  return Math.sqrt(n);
}

// Supported operations: addition (+), subtraction (-), multiplication (*), division (/), modulo (%), and power (^).
function calculate(operation, left, right) {
  validateOperand(left);
  validateOperand(right);

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
    case '%':
      return modulo(left, right);
    case '^':
      return power(left, right);
    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }
}

function main(args) {
  if (args.length === 2 && args[0] === 'sqrt') {
    const input = args[1];
    if (input.trim() === '') {
      throw new Error('Operands must be finite numbers.');
    }
    console.log(squareRoot(Number(input)));
    return;
  }

  if (args.length !== 3) {
    throw new Error('Usage: node src/calculator.js <+|-|*|/|%|^> <number> <number> | sqrt <number>');
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

module.exports = { calculate, modulo, power, squareRoot };
