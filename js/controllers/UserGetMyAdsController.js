'use strict';

app.controller('UserGetMyAdsController',
    function ($scope, $location, $rootScope, userService, notifyService, pageSize) {
        $scope.adsParams = {
            'startPage' : 1,
            'pageSize' : pageSize
        };

        $scope.getAds = function() {
            userService.getUserAds(
                $scope.adsParams,
                function success(data) {
                    //console.log(data);
                    $scope.ads = data;
                },
                function error(err) {
                    notifyService.showError("Cannot load user ads", err);
                }
            );
        };

        $scope.deactivate = function(id) {
            userService.deactivateAd(id,
                function success() {
                    notifyService.showInfo("Ad successfully deactivated!");
                    $scope.getAds();
                },
                function error(err) {
                    notifyService.showError("Failed to deactivate ad", err);
                })
        };

        $scope.publishAgain = function(id) {
            userService.publishAgainAd(id,
                function success() {
                    notifyService.showInfo("Advertisement re-submitted for approval. Once approved, it will be published!");
                    $scope.getAds();
                },
                function error(err) {
                    notifyService.showError("Failed to publish again ad", err);
                })
        };

        $scope.deleteAd = function(id) {
            userService.deleteAd(id,
                function success() {
                    notifyService.showInfo("Ad deleted");
                    $scope.getAds();
                },
                function error(err) {
                    notifyService.showError("Failed to delete ad", err);
                });
        };

        $scope.editAd = function(id) {
            userService.getUserAdById(id,
                function success(data) {
                    sessionStorage['editAd'] = JSON.stringify(data);
                    $location.path('/user/ads/edit');

                },
                function error(err) {
                    notifyService.showError("Failed to open Edit page", err);
                }
            )
        };

        $scope.$on("navBtnSelectionChange", function(event, selectedId) {
            $scope.navBtnId = selectedId;
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