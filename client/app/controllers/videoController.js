angular.module('app.video', [])
.controller('videoController', function($scope, $window){
  $scope.test = 'Video says: Hello world!';

  var socket = io.connect("http://127.0.0.1:3000/"); // dev: route must change for deployment

  $scope.submitComment = function(){
    console.log('Test----> inside submitComment');
    socket.emit('cs-comment', {videoId: 'nS68JH9lFEs'}); //dev: videoId will be variable
    
  }

  socket.on('sc-init', function(data){
    console.log("SocketIO is a success! data = ", data);
    
  }); //SCcomment


  /******TEST******/

  // socket.on('sc-comment', function(data){
  //   console.log("SocketIO is a success! data = ", data);
  // }); //SCcomment

  /******TEST*******/
});
