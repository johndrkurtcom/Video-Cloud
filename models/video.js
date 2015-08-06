var mongoose = require('mongoose');

var videoSchema = mongoose.Schema({
  videoprovider: String,
  videoid: String,
  videourl: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  commentCount: Number
});

module.exports = mongoose.model('Video', videoSchema);