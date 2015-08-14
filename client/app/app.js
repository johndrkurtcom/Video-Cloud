angular.module('app', ['app.home', 'app.video', 'app.userName', 'ngRoute', 'app.services'])
  .config(function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/login'
      })
      .when('/login', {
        templateUrl: 'app/views/userNamePage.html',
        controller: 'UserNameController'
      })
      .when('/home', {
        templateUrl: 'app/views/home.html',
        controller: 'homeController'
      })
      .when('/video/:videoId*', {
        templateUrl: 'app/views/video.html',
        controller: 'videoController'
      })
      .when('/video', {
        templateUrl: 'app/views/video.html',
        controller: 'videoController'
      })
      .when('/logout', {
        redirectTo: '/login'
      })
      // .when('/signup', {
      //   templateUrl: 'app/auth/signup.html',
      //   controller: 'AuthController'
      // })
      // .when('/signout', {
      //   templateUrl: 'app/shorten/1.html',
      //   controller: 'LinksController'
      // })
      // Your code here


    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    // $httpProvider.interceptors.push('AttachTokens');
  }) //factory.roomHelper()
  .run(function($rootScope, $location, $window) {
    //func: reroute to login if username has not been set. 
    $rootScope.$on('$routeChangeStart', function(evt, next, current) {
      // console.log('TEST ----------> before the app runs. url = '+$location.url());
      var url = $location.url();

      if (url !== '/login') { //any route other than /login
        if (!$rootScope.username) {
          $location.path('/login');
        } //if

        if (url === '/video') { //play video is going to /video
          //func: check if player is defined first
          if ($window.player !== undefined) {
            $window.player.playVideo();
          } //if
        } else { //anything other than 
          //func: check if player is defined first
          if ($window.player !== undefined) {
            $window.player.pauseVideo();
          } //if
        } //if(url)
      } //if

    }); //on(routeChangeStart)
  })
  .run(function($rootScope, $location) {
    // var url = $location.url();

    // if(url==='/video'){

    // }
  });
