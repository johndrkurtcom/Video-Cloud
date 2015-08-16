angular.module('app.userName', [])

.controller('UserNameController', function ($rootScope, $scope, $window, $location) {
  // console.log("TEST ---> username=", $scope.username);

  /*********INIT*********/
  $('#videoContainer').hide(); // hide video player
  
  console.log("TESt --> inside userNameController");
  socket.emit('cs-init-user', {});

  // // func: server responds to cs-init-video with sc-init-user containing video data
  socket.on('sc-init-user', function(userData) {
    console.log("TEST ---> sc-init-user. User = ", userData);
    
    // save the logged in user to the window object. see contract.md to see details.
    $window.user = userData.user;

    if(userData.logged_in){
      console.log("Logged in!!!");
      
      $rootScope.$apply(function(){ //forcing a re-render
        $location.path('/home');

      }); //rootScope.apply()

    } //if(logged_in)
  }); //sc-init-user
  
  $window.user = $window.user || {}; //init
  $window.user.username = ''; //reset username (route from logout)
    
  /*********CONTROLLER*********/
  $scope.user = {};

  $scope.continue = function(isvalid){
    if(isvalid){
      // for dev purposes this is commented out
      // $window.localStorage.setItem('username', $scope.user.username);
      $window.user.username = $scope.user.username; 
      // func: reroute to /home
      $location.path('/home');
    } //if
  };

});