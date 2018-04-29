const express = require('express');
const moment = require('moment');
const app = express();

app.get('/api/time/:timeString', (req, res) => {
  const timeString = req.params.timeString;
  let time;
  let unix;
  let natural;

  if (Number.isNaN(Number(timeString))) {
    time = moment(timeString, 'MMMM Do YYYY');
    unix = time.unix();
    natural = time.format('MMMM Do YYYY');
  } else {
    time = moment.unix(timeString);
    unix = time;
    natural = time.format('MMMM Do YYYY');
  }

  if (!time.isValid()) {
    return res.status(422).json({
      unix: null,
      natural: null,
    });
  }

  res.status(200).json({
    unix,
    natural,
  });
});

app.listen(3000, () => console.log('connected'));