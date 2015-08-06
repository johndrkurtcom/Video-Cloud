var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

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

commentSchema.plugin(findOrCreate);

module.exports = mongoose.model('Comment', commentSchema);