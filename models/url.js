const mongoose = require('mongoose');

const { Schema } = mongoose;

const UrlSchema = new Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
});

const Url = mongoose.model('Url', UrlSchema);

module.exports = Url;
