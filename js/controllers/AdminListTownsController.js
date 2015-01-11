'use strict';

app.controller('AdminListTownsController',
    function ($scope, pageSize, $location, townsService, categoriesService, notifyService, adminService) {
        $scope.adsParams = {
            'startPage' : 1,
            'pageSize' : 10
        };

        $scope.getTowns = function () {
            adminService.getTowns(
                $scope.adsParams,
                function success(data) {
                    $scope.towns = data;
                    console.log(data);
                },
                function error(err) {
                    notifyService.showError('Error loading users', err);
                }
            )
        };

        $scope.deleteTown = function(data) {
            adminService.deleteTownById(data.id,
                function success() {
                    notifyService.showInfo("Successfully deleted town!");
                    $location.path('/admin/towns/list');
                },
                function error(err) {
                    notifyService.showError("Error while deleting town", err);
                })
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

        $scope.getTowns();
    }
);
