angular.module('app.video', [])
  .controller('videoController', function($scope, $window, $timeout, testData, scrollerHelper) {
    //test data:
    // $scope.comments = testData.comments;
    // 2. This code loads the IFrame Player API code asynchronously.
        

    /*********INIT*********/
    $('#videoContainer').show(); 

    var socket = io.connect("http://127.0.0.1:3000/"); // dev: route must change for deployment

    // socket emits init event to tell server the video selected
    socket.emit('cs-init', {
      videoId: 'nS68JH9lFEs'
    }); //dev: videoId will be variable

    // server responds to cs-init with sc-init containing video data
    socket.on('sc-init', function(video) {
      console.log("SocketIO is a success! data = ", video);
    });

    /*********CONTROLLERS*********/
    $scope.submitComment = function() {
      /*****TEST ****///func: get current video time
      var currentTime = $window.player.getCurrentTime();
      var comment = $scope.comment; 
      var username = testData.username; 

      socket.emit('cs-comment', {
        username: 'Matthias',
        videoId: 'nS68JH9lFEs',
        text: comment,
        timestamp: currentTime
      }); //dev: videoId will be variable
    }; //submitComment

    // if server saves a submitted comment correctly, server broadcasts the new comment to entire namespace
    socket.on('sc-comment new', function(comment) {
      // todo: add new comment to scrolling output?
      console.log('new comment received', comment);
    }); //sc-comment

    // error handling in case the submitted comment could not be handled by server
    socket.on('sc-comment error', function(error) {
      console.log('something went wrong, the comment could not be saved', error);
    }); //sc-comment

    /*********VIDEO CONTROLS*********/
    //NOTE: delayed to wait for page load

    $timeout(function() {
      // $window.videoPlayer.playVideo();
      //fund: detect state change of video
      $window.player.addEventListener('onStateChange', function(event){
        var e = event.data;
        if(e===-1){ //unstarted

        }else if(e===0){ //ended

        }else if(e===1){ //playing: re-establish setTimouts(comments)
          console.log("TEST: PLAY EVENT");
          var currentTime = $window.player.getCurrentTime();
          $scope.promises = scrollerHelper.makePromises(testData.comments, currentTime);
        }else if(e===2){ //paused: cancel all setTimouts(comments)
          console.log("TEST: PAUSE EVENT");
          scrollerHelper.killPromises($scope.promises);
        }else if(e===3){ //buffering

        }else if(e===5){ //video cued

        } //if(e)
      }); //addEvenListener


    }, 2000); //$timeout

  }).factory('scrollerHelper', function($timeout){ //
    var makePromises = function(comments, currentTime){ 
      console.log('inside makePromises. comments=',comments);
      var promises = [];
      
      for(var i=0; i<comments.length; i++){
        var comment = comments[i];
        var text = comment.text;
        var timestamp = comment.timestamp; 
        var delay = timestamp-currentTime;
        if(delay>0){
          var promise = $timeout(function(text){
            return function(){
              console.log("MESSAGE:"+text);
            }
          }(text), delay*1000);

          promises.push(promise);
        } //if
      } //for(comments)
      console.log("Promises = ", promises);
      // killPromises(promises);
      return promises;
    } //makePromises()

    var killPromises = function(promises){
      console.log('inside killPromises. promises=', promises);
      for(var i=0; i<promises.length; i++){
        $timeout.cancel(promises[i]); //cancel all promises
      } //for(promises)
    } //killPromises()

    return {
      makePromises: makePromises,
      killPromises: killPromises
    };
  }).factory('testData', function(){
    return {
      username: 'Payton',
      videoId: 'nS68JH9lFEs', 
      comments: [{
          person: {
            displayname: 'Name 1'
          },
          video: {},
          text: 'Lipsum 1',
          votes: 3,
          timestamp: 4
        }, {
          person: {
            displayname: 'Name 2'
          },
          video: {},
          text: 'Lipsum 2',
          votes: 0,
          timestamp: 7
        }, {
          person: {
            displayname: 'Name 3'
          },
          video: {},
          text: 'Lipsum 3',
          votes: 18,
          timestamp: 10
        }, {
          person: {
            displayname: 'Name 4'
          },
          video: {},
          text: 'Lipsum 4',
          votes: -3,
          timestamp: 13
        }, {
          person: {
            displayname: 'Name 5'
          },
          video: {},
          text: 'Lipsum 5',
          votes: 26,
          timestamp: 16
      }] //comments

    }; //return 
}); //controller
