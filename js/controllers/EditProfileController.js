'use strict';

// The LoginController is responsible for the "Login" screen
app.controller('EditProfileController',
    function ($scope, $location, townsService, userService, notifyService) {
        $scope.towns = townsService.getTowns();
        $scope.getUserData = function() {
            userService.getUserProfile(
                function success(data) {
                    $scope.userData = data;
                },
                function error(err) {
                    notifyService.showError("An error occurred while downloading user data", err);
                }
            )
        };

        $scope.update = function(data) {
            userService.updateUserProfile(data,
            function success() {
                notifyService.showInfo("Successfully updated profile!");
                $location.path('/user/profile/');
            },
            function error(err) {
                notifyService.showError("Error while updating profile", err);
            })
        };

        $scope.changePass = function(data) {
            userService.changePassword(data,
                function success() {
                    notifyService.showInfo("Successfully changed password!");
                    $location.path('/user/profile/');
                },
                function error(err) {
                    notifyService.showError("Error while changing password", err);
                })
        };

        $scope.getUserData();
    }
);
