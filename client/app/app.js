angular.module('app', ['app.home', 'app.video', 'app.auth', 'ngRoute'])
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
    // .when('/', {
    //   templateUrl: 'app/views/home.html',
    //   controller: 'homeController'
    // })
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

    $httpProvider.interceptors.push('Attach');

}) //factory.roomHelper()

.factory('Attach', function(){
  var attach = {
    request: function(object){
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})

.run(function ($rootScope, $location) {
    
});