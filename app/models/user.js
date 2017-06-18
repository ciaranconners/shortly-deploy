// var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function() {
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function() {
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

 // user.increments('id').primary();
 //      user.string('username', 100).unique();
 //      user.string('password', 100);
 //      user.timestamps();

 var bcrypt = require('bcrypt-nodejs');
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;

 var userSchema = new Schema({
   username: {type: String, required: true, index: {unique: true}},
   password: {type: String, required: true}
 });

var User = mongoose.model('Link', userSchema);


User.comparePassword = function(possibleMatch, savedPassword, callback) {
  bcrypt.compare(possibleMatch, savedPassword, function(err, match) {
    if (err) {
      return callback(match, null);
    }
    callback(null, match);
  });
};

userSchema.pre('save', function(next) {
  // here is where the promises come out
  var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.get('password'), null, null).bind(this)
      .then(function(hash) {
        this.password = hash;
        next();
      });
});

module.exports = User;
