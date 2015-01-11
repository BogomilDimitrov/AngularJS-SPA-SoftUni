'use strict';

// The LoginController is responsible for the "Login" screen
app.controller('AdminEditProfileController',
    function ($scope, $location, townsService, adminService, notifyService) {
        $scope.towns = townsService.getTowns();

        $scope.userData = JSON.parse(sessionStorage['foundUser']);
        delete sessionStorage['foundUser'];

        $scope.update = function(data) {
            console.log(data);
            adminService.updateUserProfile(data,
                function success() {
                    notifyService.showInfo("Successfully updated profile!");
                    $location.path('/admin/users/list');

                },
                function error(err) {
                    notifyService.showError("Error while updating profile", err);
                })
        };

        $scope.changePass = function(data) {
            console.log(data);
            var params = {
                Username: data.userName,
                NewPassword: data.newpassword,
                ConfirmPassword: data.confirmPassword
            };
            adminService.changeUserPassword(params,
                function success() {
                    notifyService.showInfo("Successfully changed password!");
                    $location.path('/admin/users/list/');
                },
                function error(err) {
                    notifyService.showError("Error while changing password", err);
                })
        };
    }
);
