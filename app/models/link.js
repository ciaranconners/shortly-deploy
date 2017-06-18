var db = require('../config');
var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var linkSchema = new Schema({
  url: String,
  code: Number,
  title: String,
  visits: Number,
  baseUrl: String
});

var createShortUrl = function(url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};

linkSchema.pre('save', function(next) {
  var code = createShortUrl(this.url);
  console.log('code:', code);
  this.code = code; // => save the code
  console.log(this);
  next();
});

var Link = mongoose.model('Link', linkSchema);

module.exports = Link;
