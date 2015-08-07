var fakedata = require('./fakedata').data;
var Video = require('../models').Video;
var addComment = require('../controllers/commentController.js').addComment;

module.exports = function(io) {
  // console.log(fakedata);
  // io.connection
  // listen to socket event 'cs-init':
  // // contains: video id, user objectID or empty
  // // video ID = room
  // // remove socekt from all other rooms 
  // // add socket to room, 
  // socket.emit 'sc-init' with fake video info ..
  // // contains: sample comments [{text : string, username, .. timestamp }]
  // 
  // listening to socket event 'cs-comment'
  // // contain: video id, user objectID, text, timestamp ... 

  var setVideoChannel = function(socket, data) {
    // data contains video id info which represents the namespace the socket needs to join
    var channel = data.videoId;
    // socket should leave all other namespaces / rooms
    if (socket.lastChannel) {
      socket.leave(socket.lastChannel);
      socket.lastChannel = null;
    }
    // socket needs to join the namespace of the video id
    socket.join(channel);
    socket.lastChannel = channel;
  }

  io.on('connection', function(socket) {
    console.log('connected');

    // listen to init event from client
    socket.on('cs-init', function(data) {
      console.log(data);
      setVideoChannel(socket, data);

      Video.findOne({
        videoId: data.videoId
      }, function(err, video) {
        if (err) throw err;
        // we emit a server-client event to the socket 
        socket.emit('sc-init', {
          video: video
        })

      })


    });

    // listen to new comments from socket
    socket.on('cs-comment', function(data) {
      // add comment to video 
      addComment(data, function(err, data) {
        if (err) {
          // if something went wrong, communicate the error to client
          socket.emit('sc-comment error', {
            error: err
          });
        } else {
          // if comment successfully added to video, return entire video object to client
          socket.emit('sc-comment success', {
            success: data
          });
        }
      })
    });

    socket.on('disconnect', function() {
      io.emit('user disconnected');
    });
  })
}