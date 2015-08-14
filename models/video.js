var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var Schema = mongoose.Schema;

var videoSchema = new Schema({
  // videoprovider: String,
  videoId: String,
  duration: Number, //seconds
  videoTitle: {
    type: String,
    default: 'unknown title'
  },
  // videourl: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  commentCount: {
    type: Number,
    default: 0
  }
});

videoSchema.plugin(findOrCreate);

module.exports = mongoose.model('Video', videoSchema);
