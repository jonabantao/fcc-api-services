const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const ipaddress = req.header('x-forwarded-for') || req.connection.remoteAddress;

  // Checks just in case regex fails and returns null
  const software = req.headers['user-agent'].match(/\(([^)]+)\)/) || 'Not available';
  const language = req.headers['accept-language'] ? req.headers['accept-language'].match(/^([^,]*)/) : 'Not available';

  const payload = {
    ipaddress,
    language,
    software,
  };

  return res.status(200).json(payload);
});

module.exports = router;
