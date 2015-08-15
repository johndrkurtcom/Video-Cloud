angular.module('app.video', [])
  .controller('videoController', function($scope, $rootScope, $http, $window, $timeout, testData, commentService, $routeParams, $location, commentGraph) {

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
      if (!videoData.video) {
        $scope.comments = [];
      } else {
        $scope.comments = videoData.video.comments;
      } //if
      // save the logged in user to the window object. see contract.md to see details.
      $window.user = videoData.user;

      // comment graph setup
      commentGraph.graph($scope.comments);
      commentGraph.move();

    });

    /*********CONTROLLERS*********/
    $scope.submitComment = function() {
      // func: get current video time
      var comment = {
        userId: $window.user._id,
        username: $window.user.username,
        videoId: videoId,
        text: $scope.comment,
        timestamp: $window.player.getCurrentTime()
      };

      // console.log('submitComment. comment=',comment);

      socket.emit('cs-comment', comment); //dev: videoId will be variable
      $scope.comment = ''; //reset comment input

    }; //submitComment()

    /*********SOCKET LISTENERS*********/


    // if server saves a submitted comment correctly, server broadcasts the new comment to entire namespace
    socket.on('sc-comment new', function(comment) {
      // todo: add new comment to scrolling output?
      // console.log('new comment received', comment);
      commentService.displayComment(comment);
    }); //sc-comment

    // error handling in case the submitted comment could not be handled by server
    socket.on('sc-comment error', function(error) {
      console.log('something went wrong, the comment could not be saved', error);
    }); //sc-comment

    /*********VIDEO CONTROLS*********/
    //NOTE: delayed to wait for page load

    $timeout(function() {
      // func: test videoId on player first
      // console.log("TEST ----> videoId="+videoId);
      var player = $window.player;
      if (player !== undefined) {
        var existingVideo = player.getVideoData(); //get video information {video_id, author, title}

        if (existingVideo.video_id !== videoId) { //new video being loaded
          player.loadVideoById(videoId, function() {
            console.log("TEST --------------> loadVideoById() callback!");
          }); //load new video by video_id

          //func: detect state change of video
          $window.player.addEventListener('onStateChange', function(event) {
            // console.log('TEST------> addEventListener');
            var e = event.data;
            if (e === -1) { //unstarted

            } else if (e === 0) { //ended
              // console.log("TEST: VIDEO ENDED");
            } else if (e === 1) { //playing: re-establish setTimouts(comments)
              console.log("TEST: VIDEO PLAYING");
              //NOTE: This is when the video data actually becomes available.  
              var currentTime = $window.player.getCurrentTime();
              $scope.promises = commentService.makePromises($scope.comments, currentTime);

              //*** Save Video ***//
              var videoData = player.getVideoData(); //get video information {video_id, author, title}

              var video = {
                videoTitle: videoData.title,
                videoId: videoData.video_id,
                videoDuration: player.getDuration()
              };

              socket.emit('cs-videoLoad', video); //dev: videoId will be variable

            } else if (e === 2) { //paused: cancel all setTimouts(comments)
              console.log("TEST: VIDEO PAUSED");
              commentService.killPromises($scope.promises);

            } else if (e === 3) { //buffering
              // console.log("TEST: VIDEO BUFFERING");

            } else if (e === 5) { //video cued

            } //if(e)
          }); //addEvenListener

        } else { // play existing video
          player.playVideo();

        } //if(existingVideoId !== videoId)
      } //if(player)
    }, 0); //$timeout


  }).factory('commentService', function($timeout, $window) { //
    // func: create setTimeouts to display comments in the future
    var makePromises = function(comments, currentTime) {
        var promises = []; //array which holds the handles for setTimeouts 
        // console.log("Inside makePromises(). comments=", comments);
        for (var i = 0; i < comments.length; i++) {
          var comment = comments[i];
          var timestamp = comment.timestamp; //relative time position of comment
          var delay = timestamp - currentTime; //time between comment time and current time in video

          //func: play video only if the timestamp occurs after the current position in the video
          if (delay > 0) {
            var promise = $timeout(function(comment) { //decorator function creates custom closure for text variable
              return function() { //display comment!
                displayComment(comment);
              }
            }(comment), delay * 1000);

            promises.push(promise);
          } //if
        } //for(comments)
        return promises;
      } //makePromises()

    // func: cancels setTimeouts which have been previously set. 
    var killPromises = function(promises) {
        // console.log('inside killPromises. promises=', promises);
        // $("#commentContainer").html('');
        for (var i = 0; i < promises.length; i++) {
          $timeout.cancel(promises[i]); //cancel all promises
        } //for(promises)
      } //killPromises()

    var displayComment = function(comment) {
        var username = comment.username || "Anonymouse";
        var timestamp = toHMS(Math.round(comment.timestamp)); //func: beautify time
        var content = "(" + timestamp + ") " + username + ": " + comment.text;
        var $comment = $("<div class='textBubble'>" + content + "</div>")
        if (username === $window.user.username) { //message belongs to current user
          $comment.addClass('belongsToUser');
        } //if

        $("#commentContainer").prepend($comment);
      } //displayComment


    var toHMS = function(seconds) {
        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor((seconds - (hours * 3600)) / 60);
        var seconds = seconds - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
          hours = "0" + hours;
        }
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        var time = hours + ':' + minutes + ':' + seconds;
        return time;
      } //toHMS()

    // var clearContent = function()

    return {
      makePromises: makePromises,
      killPromises: killPromises,
      displayComment: displayComment
    };
  }).factory('testData', function() {
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
