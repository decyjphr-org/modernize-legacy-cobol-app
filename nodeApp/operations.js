const data = require('./data');

function viewBalance() {
  return data.readBalance();
}

function creditAccount(amount) {
  const currentBalance = data.readBalance();
  const newBalance = currentBalance + amount;
  data.writeBalance(newBalance);
  return newBalance;
}

function debitAccount(amount) {
  const currentBalance = data.readBalance();
  if (currentBalance >= amount) {
    const newBalance = currentBalance - amount;
    data.writeBalance(newBalance);
    return newBalance;
  } else {
    return null;
  }
}

module.exports = {
  viewBalance,
  creditAccount,
  debitAccount
};
