const assert = require('assert');
const data = require('../data');

describe('Data Management', function() {
  describe('readBalance', function() {
    it('should return the current balance', function() {
      const balance = data.readBalance();
      assert.strictEqual(balance, 1000.00);
    });
  });

  describe('writeBalance', function() {
    it('should update the balance with a valid amount', function() {
      data.writeBalance(1500.00);
      const balance = data.readBalance();
      assert.strictEqual(balance, 1500.00);
    });

    it('should not update the balance with an invalid amount', function() {
      data.writeBalance(-500.00);
      const balance = data.readBalance();
      assert.strictEqual(balance, 1500.00);
    });
  });
});
