'use strict';

app.controller('UserGetMyAdsController',
    function ($scope, $location, userService, notifyService, pageSize) {
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
                    $location.path('/user/ads')
                },
                function error(err) {
                    notifyService.showError("Failed to deactivate ad", err);
                })
        };

        $scope.publishAgain = function(id) {
            userService.publishAgainAd(id,
                function success() {
                    notifyService.showInfo("Advertisement re-submitted for approval. Once approved, it will be published!");
                    $location.path('/user/ads')
                },
                function error(err) {
                    notifyService.showError("Failed to publish again ad", err);
                })
        };

        $scope.deleteAd = function(id) {
            userService.deleteAd(id,
                function success() {
                    notifyService.showInfo("Ad deleted");
                    $location.path('/user/ads')
                },
                function error(err) {
                    notifyService.showError("Failed to delete ad", err);
                });
        };

        $scope.getAds();
    }
);