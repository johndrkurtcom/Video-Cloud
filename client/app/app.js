angular.module('app', ['app.home', 'app.video', 'ngRoute'])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    // .when('/signin', {
    //   templateUrl: 'app/auth/signin.html',
    //   controller: 'AuthController'
    // })
    // .when('/signup', {
    //   templateUrl: 'app/auth/signup.html',
    //   controller: 'AuthController'
    // })
    .when('/', {
      templateUrl: 'app/views/home.html',
      controller: 'homeController'
    })
    .when('/video', {
      templateUrl: 'app/views/video.html',
      controller: 'videoController'
    })
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
    
});