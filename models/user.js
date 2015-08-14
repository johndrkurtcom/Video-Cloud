var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  facebook: {
    id: String,
    token: String,
    name: String
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
