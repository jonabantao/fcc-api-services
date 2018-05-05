const express = require('express');
const validUrl = require('valid-url');
const crypto = require('crypto');

const router = express.Router();
const Url = require('../models/url');


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
  const _id = shortUrl; // eslint-disable-line

  return Url.findById(shortUrl)
    .then(() => res.status(200).json({ originalUrl, shortUrl }))
    .catch(() => {
      Url.create({ _id, originalUrl, shortUrl })
        .then(() => res.status(200).json({ originalUrl, shortUrl }));
    });
});

router.get('/:shortUrl', (req, res) => {
  const { shortUrl } = req.params;

  Url.findById(shortUrl)
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: 'URL not found' });
      }

      return res.status(200).json(result);
    })
    .catch(() => res.status(500).json({ message: 'Server error' }));
});

module.exports = router;
