angular.module('app.nav', [])
  .controller('navController', function($scope, $location, $window) {
    $scope.loggedin = false;
    socket.on('sc-init-user', function(data) {
      // console.log('user init event, source of log: navController');
      if (data.logged_in) {
        $scope.loggedin = true;
        // console.log('user logged_in true');
      } else {
        $scope.loggedin = false;
        // console.log('user logged_in false');
      }
    });
  })
