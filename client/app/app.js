angular.module('app', ['app.home', 'app.video', 'app.userName', 'ngRoute'])
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
.run(function ($rootScope, $location) { 
    // var url = $location.url();

    // if(url==='/video'){
      
    // }
});