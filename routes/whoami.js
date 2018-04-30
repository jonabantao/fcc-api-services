const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const ipaddress = req.header('x-forwarded-for') ||
      req.connection.remoteAddress;
    let software = req.headers['user-agent'].match(/\(([^)]+)\)/);
    let language = req.headers['accept-language'].match(/^([^,]*)/);

    // Checks just in case regex fails and returns null
    software = software ? software[1] : 'Not available';
    language = language ? language[1] : 'Not available';

    const payload = {
      ipaddress,
      language,
      software
    };

    res.status(200).json(payload);
  }
);

module.exports = router;