const express = require('express');
const moment = require('moment');

const router = express.Router();

function isNumeric(timeStr) {
  return Number.isNaN(Number(timeStr));
}

router.get('/:timeString', (req, res) => {
  const { timeString } = req.params;
  let time;

  if (isNumeric(timeString)) {
    time = moment(timeString, 'MMMM Do YYYY');
  } else {
    time = moment.unix(timeString);
  }

  if (!time.isValid()) {
    return res.status(422).json({
      unix: null,
      natural: null,
    });
  }

  const unix = time.unix();
  const natural = time.format('MMMM Do YYYY');

  return res.status(200).json({
    unix,
    natural,
  });
});

module.exports = router;
