angular.module('app.home', [])
  .controller('homeController', function($scope) {
    $scope.home = {};
    $scope.test = 'Home says: Hello world!';
    
    $('#videoContainer').hide(); //test
    $scope.submit = function(){
      //request the vidoe and comments from the server
    }
  });