const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Home page route
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

// View balance route
app.get('/view-balance', (req, res) => {
  // Call the view balance function from main.js
  res.send('Current balance: ' + viewBalance());
});

// Credit account route
app.post('/credit', (req, res) => {
  const amount = parseFloat(req.body.amount);
  if (isNaN(amount) || amount <= 0) {
    res.send('Invalid amount. Please enter a valid credit amount.');
  } else {
    // Call the credit account function from main.js
    creditAccount(amount);
    res.send('Amount credited. New balance: ' + viewBalance());
  }
});

// Debit account route
app.post('/debit', (req, res) => {
  const amount = parseFloat(req.body.amount);
  if (isNaN(amount) || amount <= 0) {
    res.send('Invalid amount. Please enter a valid debit amount.');
  } else {
    // Call the debit account function from main.js
    const result = debitAccount(amount);
    if (result) {
      res.send('Amount debited. New balance: ' + viewBalance());
    } else {
      res.send('Insufficient funds for this debit.');
    }
  }
});

// Exit route
app.get('/exit', (req, res) => {
  res.send('Exiting the program. Goodbye!');
  process.exit();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
