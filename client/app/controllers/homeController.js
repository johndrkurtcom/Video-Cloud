angular.module('app.home', [])
  .controller('homeController', function($scope, $path) {
    $scope.home = {};
    $scope.test = 'Home says: Hello world!';
    
    $('#videoContainer').hide(); //test
    $scope.submitUrl = function(){
      $location.path('/video');  
      //request the vidoe and comments from the server


    }
  });