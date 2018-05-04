const express = require('express');

const app = express();

const timestamp = require('../routes/timestamp');
const whoAmI = require('../routes/whoami');
const urlShortener = require('../routes/url-shortener');

app.use(express.json());

app.use('/api/time', timestamp);
app.use('/api/whoami', whoAmI);
app.use('/api/url', urlShortener);

app.get('*', (req, res) => {
  res.status(404).json({ message: 'Not a valid API endpoint' });
});

module.exports = app;
