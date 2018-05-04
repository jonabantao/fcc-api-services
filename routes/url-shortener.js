const express = require('express');
const validUrl = require('valid-url');
const crypto = require('crypto');

const router = express.Router();

function createShortUrl(url) {
  return crypto.createHash('md5')
    .update(url)
    .digest('hex')
    .substring(0, 7);
}

router.post('/new/', (req, res) => {
  const { originalUrl } = req.body;

  if (!validUrl.isWebUri(originalUrl)) {
    return res.status(422).json({
      message: 'Incorrect format. Please use a valid protocol and website.',
    });
  }

  const shortUrl = createShortUrl(originalUrl);

  return res.status(200).json({
    originalUrl,
    shortUrl,
  });
});

module.exports = router;
