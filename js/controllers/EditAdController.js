'use strict';

app.controller('EditAdController',
    function ($scope, $location, townsService, categoriesService,
              userService, notifyService) {
        $scope.ad = JSON.parse(sessionStorage['editAd']);
        console.log($scope.ad);
        delete sessionStorage['editAd'];
        $scope.categories = categoriesService.getCategories();
        $scope.towns = townsService.getTowns();


        $scope.fileSelected = function(fileInputField) {
            delete $scope.ad.imageDataUrl;
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function() {
                    $scope.ad.imageDataUrl = reader.result;
                    $(".image-box").html("<img src='" + reader.result + "'>");
                };
                $scope.ad.changeimage = false;
                reader.readAsDataURL(file);
            } else {
                $(".image-box").html("<p>File type not supported!</p>");
            }
        };

        $scope.changeImage = function() {
            $scope.ad.changeimage = true;
        };

        $scope.deleteImage = function() {
            $scope.ad.changeimage = true;
            delete $scope.ad.imageDataUrl;
        };

        $scope.editAd = function(data) {
            userService.editAd(data.id, data,
                function success() {
                    notifyService.showInfo('Successfully edited ad');
                    $location.path('/user/home');
                },
                function error(err) {
                    notifyService.showError('Error occurred while editing ad', err);
                }
            );
        };
    }
);
