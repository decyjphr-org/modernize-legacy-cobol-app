const assert = require('assert');
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

let finalBalance = 1000.00;

function viewBalance() {
  return finalBalance.toFixed(2);
}

function creditAccount(amount) {
  finalBalance += amount;
}

function debitAccount(amount) {
  if (finalBalance >= amount) {
    finalBalance -= amount;
    return true;
  } else {
    return false;
  }
}

app.get('/', (req, res) => {
  res.send(`
    <h1>Account Management System</h1>
    <form action="/view-balance" method="get">
      <button type="submit">View Balance</button>
    </form>
    <form action="/credit" method="post">
      <input type="number" name="amount" step="0.01" placeholder="Enter credit amount" required>
      <button type="submit">Credit Account</button>
    </form>
    <form action="/debit" method="post">
      <input type="number" name="amount" step="0.01" placeholder="Enter debit amount" required>
      <button type="submit">Debit Account</button>
    </form>
    <form action="/exit" method="get">
      <button type="submit">Exit</button>
    </form>
  `);
});

app.get('/view-balance', (req, res) => {
  res.send('Current balance: ' + viewBalance());
});

app.post('/credit', (req, res) => {
  const amount = parseFloat(req.body.amount);
  if (isNaN(amount) || amount <= 0) {
    res.send('Invalid amount. Please enter a valid credit amount.');
  } else {
    creditAccount(amount);
    res.send('Amount credited. New balance: ' + viewBalance());
  }
});

app.post('/debit', (req, res) => {
  const amount = parseFloat(req.body.amount);
  if (isNaN(amount) || amount <= 0) {
    res.send('Invalid amount. Please enter a valid debit amount.');
  } else {
    const result = debitAccount(amount);
    if (result) {
      res.send('Amount debited. New balance: ' + viewBalance());
    } else {
      res.send('Insufficient funds for this debit.');
    }
  }
});

app.get('/exit', (req, res) => {
  res.send('Exiting the program. Goodbye!');
  process.exit();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

describe('Main Logic Integration Tests', function() {
  it('should display the current balance', function(done) {
    request(app)
      .get('/view-balance')
      .expect(200)
      .expect('Current balance: 1000.00', done);
  });

  it('should credit the account with a valid amount', function(done) {
    request(app)
      .post('/credit')
      .send({ amount: '100.00' })
      .expect(200)
      .expect('Amount credited. New balance: 1100.00', done);
  });

  it('should not credit the account with an invalid amount', function(done) {
    request(app)
      .post('/credit')
      .send({ amount: '-100.00' })
      .expect(200)
      .expect('Invalid amount. Please enter a valid credit amount.', done);
  });

  it('should debit the account with a valid amount', function(done) {
    request(app)
      .post('/debit')
      .send({ amount: '50.00' })
      .expect(200)
      .expect('Amount debited. New balance: 1050.00', done);
  });

  it('should not debit the account with an invalid amount', function(done) {
    request(app)
      .post('/debit')
      .send({ amount: '-50.00' })
      .expect(200)
      .expect('Invalid amount. Please enter a valid debit amount.', done);
  });

  it('should not debit the account with an amount greater than the balance', function(done) {
    request(app)
      .post('/debit')
      .send({ amount: '2000.00' })
      .expect(200)
      .expect('Insufficient funds for this debit.', done);
  });

  it('should exit the application', function(done) {
    request(app)
      .get('/exit')
      .expect(200)
      .expect('Exiting the program. Goodbye!', done);
  });
});
