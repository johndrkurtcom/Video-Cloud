var fakedata = require('./fakedata').data;
module.exports = function(io) {
  console.log(fakedata);
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

  io.on('connection', function(socket) {
    // listen to init event from client
    socket.on('cs-init', function(data) {
      console.log(data);
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
      // we emit a server-client event to the socket 
      socket.emit('sc-init', {
        comments: fakedata
      })
    });
    socket.on('disconnect', function() {
      io.emit('user disconnected');
    });
  })
}