angular.module('app.userName', [])

.controller('UserNameController', function ($rootScope, $scope, $window, $location) {
  console.log("TEST ---> username=", $scope.username);
  /*********INIT*********/
  $rootScope.username = ''; //reset username (route from logout)
  $('#videoContainer').hide(); // hide video player
    
  /*********CONTROLLER*********/
  $scope.user = {};

  $scope.continue = function(isvalid){
    if(isvalid){
      // for dev purposes this is commented out
      // $window.localStorage.setItem('username', $scope.user.username);
      $rootScope.username = $scope.user.username; 
      // $rootScope.username = 
      $location.path('/home');
    }
  };

});