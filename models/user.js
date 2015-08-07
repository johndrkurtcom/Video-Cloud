var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  // profile: {
  //   provider: String,
  //   id: String,
  //   displayName: String,
  //   emails: {
  //     type: Array,
  //     default: []
  //   }
  // },
  created: {
    type: Date,
    default: Date.now
  }
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);