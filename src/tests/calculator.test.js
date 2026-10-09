'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const { describe, it } = require('node:test');
const path = require('node:path');
const { calculate } = require('../calculator');

describe('calculate', () => {
  it('adds positive numbers', () => {
    assert.equal(calculate('+', 2, 3), 5);
  });

  it('adds negative numbers and zero', () => {
    assert.equal(calculate('+', -2, 0), -2);
    assert.equal(calculate('+', -2, 5), 3);
  });

  it('subtracts numbers', () => {
    assert.equal(calculate('-', 10, 4), 6);
    assert.equal(calculate('-', 4, 10), -6);
  });

  it('multiplies numbers', () => {
    assert.equal(calculate('*', 45, 2), 90);
    assert.equal(calculate('*', -3, 4), -12);
    assert.equal(calculate('*', 7, 0), 0);
  });

  it('divides numbers', () => {
    assert.equal(calculate('/', 20, 5), 4);
    assert.equal(calculate('/', 7, 2), 3.5);
    assert.equal(calculate('/', -12, 3), -4);
  });

  it('throws when dividing by zero', () => {
    assert.throws(() => calculate('/', 1, 0), {
      message: 'Cannot divide by zero.',
    });
  });

  it('rejects non-finite operands', () => {
    for (const operand of [NaN, Infinity, -Infinity]) {
      assert.throws(() => calculate('+', operand, 1), {
        message: 'Operands must be finite numbers.',
      });
    }
  });

  it('rejects unsupported operations', () => {
    assert.throws(() => calculate('^', 2, 3), {
      message: 'Unsupported operation: ^',
    });
  });
});

describe('calculator CLI', () => {
  const calculatorPath = path.join(__dirname, '..', 'calculator.js');

  it('prints the result for valid input', () => {
    const result = spawnSync(process.execPath, [calculatorPath, '+', '2', '3'], {
      encoding: 'utf8',
    });

    assert.equal(result.status, 0);
    assert.equal(result.stdout, '5\n');
    assert.equal(result.stderr, '');
  });

  it('reports invalid arguments with a nonzero exit code', () => {
    const result = spawnSync(process.execPath, [calculatorPath, '+', '2'], {
      encoding: 'utf8',
    });

    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Usage:/);
  });
});
