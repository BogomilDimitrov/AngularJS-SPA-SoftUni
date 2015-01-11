'use strict';

app.controller('UserPublishNewAdController',
    function ($scope, $location, townsService, categoriesService,
              userService, notifyService) {
        $scope.adData = {townId: null, categoryId: null};
        $scope.categories = categoriesService.getCategories();
        $scope.towns = townsService.getTowns();

        $scope.publishAd = function(adData) {
            userService.createNewAd(adData,
                function success() {
                    notifyService.showInfo("Successfully published new ad");
                    $location.path("/user/ads");
                },
                function error(err) {
                    notifyService.showError("Failed to publish ad", err);
                }
            );
        };
    }
);
