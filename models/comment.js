var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
  person: {
    type: Schema.Types.ObjectId,
    ref: 'Person'
  },
  video: {
    type: Schema.Types.ObjectId,
    ref: 'Video'
  },
  text: String,
  votes: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('Comment', commentSchema);