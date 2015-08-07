var mongoose = require('mongoose');
var Comment = require('../models').Comment;
var User = require('../models').User;
var Video = require('../models').Video;

// console.log('inside the comment controller')
// var newComment = new Comment({
//   text: 'Hello World'
// });

// newComment.save(function(err, message) {
//   console.log('inside the save method')
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('This is the fake message' + message);
//   }

// });

// this function adds new comments 
exports.addComment = function(data, callback) {
  var comment = {
    username: data.username,
    text: data.text,
    timestamp: data.timestamp
  }

  Comment.create(comment, function(err, doc) {
    if (err) throw err;

    commentId = doc._id;
    videoId = data.videoId;

    Video.findOneAndUpdate({
      videoId: videoId
    }, {
      videoId: videoId,
      $pushAll: {
        comments: [commentId]
      }
    }, {
      upsert: true,
      'new': true
    }, function(err, video) {
      if (err) throw err;

      console.log('Video: ', video);
      callback(null, 'testing');
    });

  })

}

//