angular.module('app.userName', [])

.controller('UserNameController', function ($scope, $window, $location) {
  $scope.user = {};

  $scope.continue = function(isvalid){
    if(isvalid){
      // for dev purposes this is commented out
      // $window.localStorage.setItem('username', $scope.user.username);
      $location.path('/home');
    }
  };

});