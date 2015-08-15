angular.module('app.userName', [])

.controller('UserNameController', function ($rootScope, $scope, $window, $location) {
  // console.log("TEST ---> username=", $scope.username);

  /*********INIT*********/
  $('#videoContainer').hide(); // hide video player
  
  $window.user = $window.user || {}; //init
  $window.user.username = ''; //reset username (route from logout)
    
  /*********CONTROLLER*********/
  $scope.user = {};

  $scope.continue = function(isvalid){
    if(isvalid){
      // for dev purposes this is commented out
      // $window.localStorage.setItem('username', $scope.user.username);
      $window.user.username = $scope.user.username; 
      // $rootScope.username = 
      $location.path('/home');
    }
  };

});