angular.module('app.video', [])
  .controller('videoController', function($scope, $window, $timeout) {
    $scope.test = 'Video says: Hello world!';

    var socket = io.connect("http://127.0.0.1:3000/"); // dev: route must change for deployment

    $scope.submitComment = function() {
        console.log('Test----> inside submitComment');
        socket.emit('cs-comment', {
          username: 'Matthias',
          videoId: 'nS68JH9lFEs',
          text: 'Payton is cray cray',
          timestamp: 36
        }); //dev: videoId will be variable

      } //submitComment

    socket.emit('cs-init', {
      videoId: 'nS68JH9lFEs'
    }); //dev: videoId will be variable

    // server responds to cs-init with sc-init containing video data
    socket.on('sc-init', function(video) {
      console.log("SocketIO is a success! data = ", video);
    }); //SCcomment 

    $timeout(function() {

      $window.videoPlayer.playVideo();
    }, 1500);


    /******TEST******/

    // socket.on('sc-comment', function(data){
    //   console.log("SocketIO is a success! data = ", data);
    // }); //SCcomment

    /******TEST*******/
  });