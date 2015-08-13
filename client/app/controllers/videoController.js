angular.module('app.video', [])
  .controller('videoController', function($scope, $window, $timeout, testData, scrollerHelper, $routeParams, $location, commentGraph) {

    /*********LOGIN*********/
    console.log("TEST ---> username=", $scope.username);
    if(!$scope.username){
      $location.path('/login');
    } // if

    /***********INIT**********/
    $('#videoContainer').show(); 

    var videoId = $routeParams.videoId || 'nS68JH9lFEs';
    $scope.videoId = videoId;
    // var socket = io.connect("http://127.0.0.1:3000/"); // dev: route must change for deployment

    // func: socket emits init event to tell server the video selected
    socket.emit('cs-init', {
      videoId: videoId
    }); //dev: videoId will be variable

    // func: server responds to cs-init with sc-init containing video data
    socket.on('sc-init', function(videoData) {
      console.log("SocketIO is a success! data = ", videoData);
      if(!videoData.video){
        $scope.comments = [];
      }else{
        $scope.comments = videoData.video.comments;
      } //if
    });

    data = [2,4,6,10,4,3,2,4,1,11,50,23,37,52,90,84,52,75,54];
    commentGraph.graph(data, 180);

    /*********CONTROLLERS*********/
    $scope.submitComment = function() {
      console.log('submitComment');
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
      // func: test videoId on player first
      console.log("TEST ----> videoId="+videoId);
      $window.player.loadVideoById(videoId);


      //func: detect state change of video
      $window.player.addEventListener('onStateChange', function(event){
        var e = event.data;
        if(e===-1){ //unstarted

        }else if(e===0){ //ended
          console.log("TEST: VIDEO ENDED");
        }else if(e===1){ //playing: re-establish setTimouts(comments)
          console.log("TEST: VIDEO PLAYING");
          var currentTime = $window.player.getCurrentTime();
          $scope.promises = scrollerHelper.makePromises($scope.comments, currentTime);
        }else if(e===2){ //paused: cancel all setTimouts(comments)
          console.log("TEST: VIDEO PAUSED");
          scrollerHelper.killPromises($scope.promises);

        }else if(e===3){ //buffering
          console.log("TEST: VIDEO BUFFERING");
          console.log('video load test:'+$window.player.getDuration());

        }else if(e===5){ //video cued

        } //if(e)
      }); //addEvenListener


    }, 2000); //$timeout

  }).factory('scrollerHelper', function($timeout){ //
    // func: create setTimeouts to display comments in the future
    var makePromises = function(comments, currentTime){ 
      var promises = []; //array which holds the handles for setTimeouts 
      
      for(var i=0; i<comments.length; i++){
        var comment = comments[i];
        var timestamp = comment.timestamp; //relative time position of comment
        var delay = timestamp-currentTime; //time between comment time and current time in video

        //func: play video only if the timestamp occurs after the current position in the video
        if(delay>0){
          var promise = $timeout(function(comment){ //decorator function creates custom closure for text variable
            return function(){ //display comment!
              displayComment(comment);
            }
          }(comment), delay*1000);

          promises.push(promise);
        } //if
      } //for(comments)
      return promises;
    } //makePromises()

    // func: cancels setTimeouts which have been previously set. 
    var killPromises = function(promises){
      console.log('inside killPromises. promises=', promises);
      $("#scrollerContainer").html('');
      for(var i=0; i<promises.length; i++){
        $timeout.cancel(promises[i]); //cancel all promises
      } //for(promises)
    } //killPromises()

    var displayComment = function(comment){
      var username = comment.username || "Anonymouse";
      var content = username+": "+comment.text; 
      $("#scrollerContainer").append("<div class='textBubble'>"+content+"</div>");;
    } //displayComment

    // var clearContent = function()

    return {
      makePromises: makePromises,
      killPromises: killPromises, 
      displayComment: displayComment
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
