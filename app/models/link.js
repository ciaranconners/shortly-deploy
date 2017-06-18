// var db = require('../config');
var crypto = require('crypto');

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function() {
//     this.on('creating', function(model, attrs, options) {
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/27017');
var Schema = mongoose.Schema;

var linkSchema = new Schema({
  date: {type: date, default: Date.now},
  url: String,
  code: Number,
  title: String,
  visits: Number
});

var Link = mongoose.model('Link', linkSchema);

var createShortUrl = function(url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};

Link.pre('save', function(next) {
  var code = createShortUrl(this.url);
  this.code = code; // => save the code
  next();
});

module.exports = Link;
