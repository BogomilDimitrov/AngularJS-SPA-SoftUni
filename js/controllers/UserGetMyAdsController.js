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
                notifyService.showInfo("Add successfully deactivated!");
                $location.path('/user/ads')
            },
            function error(err) {
                notifyService.showError("Failed to deactivate ad", err);
            })
        };

        $scope.getAds();
    }
);