'use strict';

app.controller('AdminAdController',
    function ($scope, $location, townsService, categoriesService,
              userService, notifyService, adminService) {
        $scope.adsParams = {
            'startPage' : 1,
            'pageSize' : 1
        };

        $scope.getAds = function () {
            adminService.getUserAds(
                $scope.adsParams,
                function success(data) {
                    $scope.ads = data;
                    console.log(data);
                },
                function error(err) {
                    notifyService.showError('Error loading ads', err);
                }
            )
        };

        $scope.approve = function(id) {
            adminService.approveAdById(
                id,
                function success() {
                    notifyService.showInfo("Successfully approved ad!");
                    $location.path('/admin/home/');
                },
                function error(err) {
                    notifyService.showError("Failed to approve ad", err);
                }
            )
        };

        $scope.reject = function(id) {
            adminService.rejectAdById(
                id,
                function success() {
                    notifyService.showInfo("Successfully rejected ad!");
                    $location.path('/admin/home/');
                },
                function error(err) {
                    notifyService.showError("Failed to rejected ad", err);
                }
            )
        };

        $scope.deleteAd = function(id) {
            adminService.deleteAdById(
                id,
                function success() {
                    notifyService.showInfo("Successfully deleted ad!");
                    $location.path('/admin/home/');
                },
                function error(err) {
                    notifyService.showError("Failed to deleted ad", err);
                }
            )
        };

        $scope.editAd = function(data) {
            sessionStorage['editAd'] = JSON.stringify(data);
            $location.path('/admin/ads/edit/');
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

        $scope.getAds();
    }
);
