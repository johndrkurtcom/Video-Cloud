var mongoose = require('mongoose');
var Comment = require('../models').Comment;
var User = require('../models').User;
var Video = require('../models').Video;


// this function adds new comments 

var addComment = function(data, callback) {
    var comment = {
      user: data.userId, // this should be the user object ID
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
          if (err) {
            callback(err, null);
          } else {
            callback(null, video);
          }
        });

      }) //comment.create()
  } //addComment

module.exports = {
  addComment: addComment
};
