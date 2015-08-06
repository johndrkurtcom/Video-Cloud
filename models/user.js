var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  profile: {
    provider: String,
    id: String,
    displayName: String,
    emails: {
      type: Array,
      default: []
    }
  },
  created: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('User', userSchema);