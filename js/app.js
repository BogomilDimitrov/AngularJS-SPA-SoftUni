'use strict';

var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap.pagination']);

app.constant('baseServiceUrl', 'http://softuni-ads.azurewebsites.net');
app.constant('pageSize', 4);

app.config(function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
    });

    $routeProvider.when('/register', {
        templateUrl: 'templates/register.html',
        controller: 'RegisterController'
    });

    $routeProvider.when('/user/home', {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/user/ads/publish', {
        templateUrl: 'templates/user/publish-new-ad.html',
        controller: 'UserPublishNewAdController'
    });

    $routeProvider.when('/user/ads/', {
        templateUrl: 'templates/user/my-ads.html',
        controller: 'UserGetMyAdsController'
    });

    $routeProvider.when('/user/ads/edit', {
        templateUrl: 'templates/user/edit-my-ad.html',
        controller: 'EditAdController'
    });

    $routeProvider.when('/user/profile', {
        templateUrl: 'templates/user/edit-profile.html',
        controller: 'EditProfileController'
    });

    $routeProvider.when('/admin/home', {
        templateUrl: 'templates/admin/admin-ads.html',
        controller: 'AdminAdController'
    });

    $routeProvider.when('/admin/ads/edit', {
        templateUrl: 'templates/admin/admin-edit-ad.html',
        controller: 'AdminEditAdController'
    });

    $routeProvider.when('/admin/users/list', {
        templateUrl: 'templates/admin/admin-list-users.html',
        controller: 'AdminListUsersController'
    });

    $routeProvider.when('/admin/users/edit/', {
        templateUrl: 'templates/admin/admin-edit-profile.html',
        controller: 'AdminEditProfileController'
    });

    $routeProvider.otherwise(
        { redirectTo: '/' }
    );

});

app.run(function ($rootScope, $location, authService) {
    $rootScope.$on('$locationChangeStart', function (event) {
        if($location.path().indexOf("/user/") != -1 && !authService.isLoggedIn()) {
            $location.path('/login');
        }
    });

    $rootScope.$on('$locationChangeStart', function (event) {
        if($location.path().indexOf("/admin/") != -1 && !authService.isAdmin()) {
            $location.path('/login');
        } else if (($location.path().indexOf('/user/') != -1) && authService.isAdmin()){
            $location.path('/admin/home')
        }
    })
});
