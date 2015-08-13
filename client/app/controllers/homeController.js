//create some fake data to test
var dummyData = [
  {
    title: 'Some movie here',
    length: 56,
    comments: 12
  },
  {
    title: 'Another movie',
    length: 112,
    comments: 1
  },
  {
    title: 'The best movie',
    length: 200,
    comments: 212
  },
  {
    title: 'The worst movie',
    length: 136,
    comments: 412
  }
];

angular.module('app.home', [])
  .controller('homeController', function($scope, $location) {
    /*********LOGIN*********/
    // console.log("TEST ---> username=", $scope.username);
    // if(!$scope.username){
    //   $location.path('/login');
    // } // if

    
    /*********INIT*********/
    $('#videoContainer').hide(); // hide video player
    
    /*********CONTROLLER*********/
    $scope.submitVideo = function(){
      var url = $scope.videoUrl;
      var videoId = url.split('=')[1];
      // console.log('test. VideoId = '+videoId);
      $location.path('/video/'+videoId); //dev  
      // $rootScope.newVideo = 
      // request the vidoe and comments from the server
    } //submitVideo

  
  })
  // I just went ahead on created my own controller here need to check with Payton
  .controller('movieListController', function($scope, $location){
    // $scope.movies = dummyData;
    //request the relevant information from the server via socet io and append it to the page
    //emmiting cs-movielist event and then listening for sc-movielist from the server
    socket.emit('cs-movielist');
    socket.on('sc-movielist', function(data){
      //save the data to a variable for ng-repeat
      $scope.movies = data.videos;
    });
    //make a function that transmits the movie id and routes user to the video page
    //it takes in the videoId as it's only argument
    $scope.select = function(id){
      $location.path('/video/' + id);
      console.log('Clicked on Movie', id);
    };
  })

//Unecessary factory for now
  // .factory('homeFactory',function(){
  //   var movie = 'This is where the displayed movies will show';
  //   return {
  //     movie: movie
  //   }
  // });
