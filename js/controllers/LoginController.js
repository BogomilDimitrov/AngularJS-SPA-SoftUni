'use strict';

// The LoginController is responsible for the "Login" screen
app.controller('LoginController',
    function ($scope, $rootScope, $location, authService, notifyService) {
        $scope.login = function(userData) {
            authService.login(userData,
            function success() {
                notifyService.showInfo("Login Successful");
                if(authService.getCurrentUser().isAdmin)
                    $location.path('/admin/home');
                else
                    $location.path('/user/home/');
            },
            function error(err) {
                notifyService.showError("Failed to login", err);
            });
        };
    }
);
