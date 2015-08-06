// /api/facebook

angular.module('app.auth', [])

.factory('Auth', function ($http){
  var signin = $http({
    method: 'GET',
    url: '/auth/facebook'
  });
  return {signin: signin};
})

.controller('AuthController', function ($scope, Auth){
  $scope.signin = function(){
    auth.signin()
    .then(function(data){
      console.log('success: ', data)
    })
    .catch(function(error){
      console.error(error);
    });
  }
});