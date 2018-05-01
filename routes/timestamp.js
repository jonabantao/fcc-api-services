const express = require('express');
const moment = require('moment');

const router = express.Router();

router.get('/:timeString', (req, res) => {
  const { timeString } = req.params;
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

  return res.status(200).json({
    unix,
    natural,
  });
});

module.exports = router;
