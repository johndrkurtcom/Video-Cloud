var Video = require('../models').Video;
var commentController = require('../controllers/commentController.js');
var videoController = require('../controllers/videoController.js');
var config = require('../config/config.js').get(process.env.NODE_ENV);
var passportSocketIo = require("passport.socketio");


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

var onAuthorizeFail = function(data, message, error, accept) {
  console.log('passportSocketIo auth failed: ', data, error);
  if (error) throw new Error(message);
  return accept(new Error(message));
}

var onAuthorizeSuccess = function(data, accept) {
  console.log('passportSocketIo auth success: ', data.user);
  return accept();
}

module.exports = function(io, sessionStore) {

  io.use(passportSocketIo.authorize({
    secret: config.session.key,
    key: config.session.secret,
    store: sessionStore,
    success: onAuthorizeSuccess,
    fail: onAuthorizeFail,
  }));

  io.on('connection', function(socket) {
    // listen to init event from client
    socket.on('cs-init', function(data) {
      console.log('cs-init');
      setVideoChannel(socket, data);
      Video.findOne({
          videoId: data.videoId
        })
        .populate('comments') //populates comments ref with comment data
        .exec(function(err, video) {
          if (err) throw err;
          // we emit a server-client event to the socket 
          socket.emit('sc-init', {
            video: video,
            user: socket.request.user,
            logged_in: socket.request.user.logged_in
          })
        });
    });

    // listen to client event requesting a movie list
    socket.on('cs-movielist', function() {
      Video.find()
        .populate('comments')
        .exec(function(err, videos) {
          if (err) throw err;
          // emit event to socket & send all movie data
          socket.emit('sc-movielist', {
            videos: videos,
            user: socket.request.user,
            logged_in: socket.request.user.logged_in
          })
        });
    });

    // listen to new comments from socket
    socket.on('cs-comment', function(comment) {
      //func: create video first if not in database
      videoController.findOrCreate(comment);

      // add comment to video 
      commentController.addComment(comment, function(err, video) {
        if (err) {
          // if something went wrong, communicate the error to client
          socket.emit('sc-comment error', {
            error: err,
            user: socket.request.user,
            logged_in: socket.request.user.logged_in
          });
        } else {
          // if comment successfully added to video
          // return entire video object to socket -- maybe redundant..
          socket.emit('sc-comment success', {
            success: video,
            user: socket.request.user,
            logged_in: socket.request.user.logged_in
          });
          // send comment to all (!) connected clients in channel
          io.to(video.videoId).emit('sc-comment new', comment);
        }
      })
    });

    socket.on('disconnect', function() {
      io.emit('user disconnected');
    });
  })
}
