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


  .controller('homeController', function($scope,$path) {
    // $scope.home = {};
    // $scope.test = 'Home says: Hello world!';
    
    $('#videoContainer').hide(); //test
    $scope.submitUrl = function(){
      $location.path('/video');  
      //request the vidoe and comments from the server


    }
  })
  // I just went ahead on created my own controller here need to check with Payton
  .controller('movieController', function($scope, homeFactory){
    $scope.movie = homeFactory.movie;
    $scope.movies = dummyData;
    //request the relevant information from the server via socet io and append it to the page
    var socket = io.connect("http://127.0.0.1:3000/"); // dev: route must change for deployment
    //need to listen to the server for an emit event don't know what to call it yet so I have sc-init
    socket.on('sc-init', function(videos){
      console.log('Successful connection with the server', videos);
    });
  })

  .factory('homeFactory',function(){
    var movie = 'This is where the displayed movies will show';
    return {
      movie: movie
    }
  });


