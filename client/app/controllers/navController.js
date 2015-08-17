angular.module('app.nav', [])
  .controller('navController', function($scope, $location, $window) {
    $scope.loggedin = false;
    socket.emit('cs-init-user');

    socket.on('sc-init-user', function(data) {
      console.log('socket fired');

      if (data.logged_in) {
        $window.user = data.user;
        $window.user.logged_in = data.logged_in;
        $scope.loggedin = true;
      } else {
        $window.user = undefined;
        $scope.loggedin = false;
      }
    });
  })
