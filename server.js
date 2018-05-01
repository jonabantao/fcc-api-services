const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const timestamp = require('./routes/timestamp');
const whoAmI = require('./routes/whoami');

app.use('/api/time', timestamp);
app.use('/api/whoami', whoAmI);

app.get('*', (req, res) => {
  res.status(404).json({ message: 'Not a valid API endpoint' });
});

app.listen(PORT, () => console.log('connected'));
