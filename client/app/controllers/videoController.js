angular.module('app.video', [])
  .controller('videoController', function($scope, $window, $timeout) {
    $scope.test = 'Video says: Hello world!';
    $('#videoContainer').show(); //test

    var socket = io.connect("http://127.0.0.1:3000/"); // dev: route must change for deployment

    $scope.submitComment = function() {
        socket.emit('cs-comment', {
          username: 'Matthias',
          videoId: 'nS68JH9lFEs',
          text: 'Payton is cray cray',
          timestamp: 36
        }); //dev: videoId will be variable

      } //submitComment

    // socket emits init event to tell server the video selected
    socket.emit('cs-init', {
      videoId: 'nS68JH9lFEs'
    }); //dev: videoId will be variable

    // server responds to cs-init with sc-init containing video data
    socket.on('sc-init', function(video) {
      console.log("SocketIO is a success! data = ", video);
    });

    // if server saves a submitted comment correctly, server broadcasts the new comment to entire namespace
    socket.on('sc-comment new', function(comment) {
      // todo: add new comment to scrolling output?
      console.log('new comment received', comment);
    });

    // error handling in case the submitted comment could not be handled by server
    socket.on('sc-comment error', function(error) {
      console.log('something went wrong, the comment could not be saved', error);
    });

    $timeout(function() {
      $window.videoPlayer.playVideo();
    }, 1500);

    $scope.$on("$destroy", function(){
    
    });
      // $('#videoContainer').hide(); //test

    $scope.$on('$viewContentLoaded', function(event) {

    }); //on viewContentLoaded
  });
