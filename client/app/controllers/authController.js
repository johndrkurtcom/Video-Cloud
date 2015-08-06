angular.module('app.auth', [])

.factory('Auth', function ($http){
  var signin = function(){
    var request = $http({
      method: 'GET',
      url: '/auth/facebook'
    });
    return request
  }
  return {signin: signin};
})

.controller('AuthController', function ($scope, Auth){
  $scope.signin = function(){
    Auth.signin()
    .then(function(data){
      console.log('success: ', data)
    })
    .catch(function(error){
      console.error(error);
    });
  }
});