'use strict';

app.controller('AdminListUsersController',
    function ($scope, pageSize, $location, townsService, categoriesService, notifyService, adminService) {
        $scope.adsParams = {
            'SortBy' : 'UserName',
            'startPage' : 1,
            'pageSize' : 10
        };

        $scope.getUsers = function () {
            adminService.getAllUsers(
                $scope.adsParams,
                function success(data) {
                    $scope.users = data;
                    //console.log(data);
                },
                function error(err) {
                    notifyService.showError('Error loading users', err);
                }
            )
        };

        $scope.deleteUser = function(data) {
            var params = {
                username: data.username
            };
            adminService.deleteUserById(params,
                function success() {
                    notifyService.showInfo("Successfully deleted user!");
                    $location.path('/admin/users/list');
                },
                function error(err) {
                    notifyService.showError("Error while deleting user", err);
                })
        };

        $scope.edit = function (id) {
            var foundUser;
            adminService.getUserById(
                id,
                function success(data) {
                    sessionStorage['foundUser'] = JSON.stringify(data);
                    $location.path('admin/users/edit');
                },
                function error(err) {
                    notifyService.showError("Error loading users", err);
                }
            )
        };

        $scope.$on("categorySelectionChanged", function(event, selectedCategoryId) {
            $scope.adsParams.categoryId = selectedCategoryId;
            $scope.adsParams.startPage = 1;
            $scope.getAds();
        });


        $scope.$on("townSelectionChanged", function(event, selectedTownId) {
            $scope.adsParams.townId = selectedTownId;
            $scope.adsParams.startPage = 1;
            $scope.getAds();
        });

        $scope.$on("statusFilterSelectionChanged", function(event, selectedStatus) {
            $scope.adsParams.status = selectedStatus;
            $scope.adsParams.startPage = 1;
            $scope.getAds();
        });

        $scope.getUsers();
    }
);
