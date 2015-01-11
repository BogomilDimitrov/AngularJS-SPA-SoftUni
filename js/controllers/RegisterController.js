'use strict';

// The LoginController is responsible for the "Login" screen
app.controller('RegisterController',
    function ($scope, $location, townsService, authService, notifyService) {
        $scope.userData = {townId: null};
        $scope.towns = townsService.getTowns();

        $scope.register = function(userData) {
            authService.register(userData,
            function success() {
                notifyService.showInfo("Registered successfully");
                $location.path('/');
            },
            function error(err) {
                notifyService.showError("Failed to register", err);
            })
        }
    }
);
