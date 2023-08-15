const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); // This package is used to generate unique keys

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Store the one-time keys in memory for this example. In a real-world scenario, you'd use a database.
let oneTimeKeys = [];

// Generate a new one-time key and add it to the array
app.post('/generateKey', (req, res) => {
  const key = uuidv4();
  oneTimeKeys.push(key);
  res.json({ key });
});

// Validate the provided key and remove it from the array
app.post('/validateKey', (req, res) => {
  const { key } = req.body;
  const index = oneTimeKeys.indexOf(key);

  if (index !== -1) {
    oneTimeKeys.splice(index, 1);
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on https://www.bingwebsite.com');
});
