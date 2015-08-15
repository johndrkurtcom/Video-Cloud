var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  // video: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Video'
  // },
  videoid: String,
  username: String,
  text: String,
  votes: {
    type: Number,
    default: 0
  },
  timestamp: Number // seconds
})

commentSchema.plugin(findOrCreate);

module.exports = mongoose.model('Comment', commentSchema);
