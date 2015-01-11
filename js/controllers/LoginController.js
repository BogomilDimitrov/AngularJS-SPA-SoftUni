'use strict';

// The LoginController is responsible for the "Login" screen
app.controller('LoginController',
    function ($scope, $rootScope, $location, authService, notifyService) {
        $scope.login = function(userData) {
            authService.login(userData,
            function success() {
                notifyService.showInfo("Login Successful");
                $location.path('/user/home/');
            },
            function error(err) {
                notifyService.showError("Failed to login", err);
            });
        }
    }
);
