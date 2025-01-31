const assert = require('assert');
const operations = require('../operations');

describe('Operations', function() {
  describe('viewBalance', function() {
    it('should return the current balance', function() {
      const balance = operations.viewBalance();
      assert.strictEqual(balance, 1000.00);
    });
  });

  describe('creditAccount', function() {
    it('should credit the account with a valid amount', function() {
      const newBalance = operations.creditAccount(100.00);
      assert.strictEqual(newBalance, 1100.00);
    });

    it('should not change the balance when credited with zero amount', function() {
      const newBalance = operations.creditAccount(0.00);
      assert.strictEqual(newBalance, 1100.00);
    });
  });

  describe('debitAccount', function() {
    it('should debit the account with a valid amount', function() {
      const newBalance = operations.debitAccount(50.00);
      assert.strictEqual(newBalance, 1050.00);
    });

    it('should not allow debiting an amount greater than the current balance', function() {
      const newBalance = operations.debitAccount(2000.00);
      assert.strictEqual(newBalance, null);
    });

    it('should not change the balance when debited with zero amount', function() {
      const newBalance = operations.debitAccount(0.00);
      assert.strictEqual(newBalance, 1050.00);
    });
  });
});
