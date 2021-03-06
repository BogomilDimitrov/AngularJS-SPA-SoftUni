'use strict';

app.controller('AdminListCategoriesController',
    function ($scope, pageSize, $location, townsService, categoriesService, notifyService, adminService) {
        $scope.adsParams = {
            'SortBy' : 'Name',
            'startPage' : 1,
            'pageSize' : 10
        };

        $scope.getCategories = function () {
            adminService.getCategories(
                $scope.adsParams,
                function success(data) {
                    $scope.categories = data;
                    console.log(data);
                },
                function error(err) {
                    notifyService.showError('Error loading categories', err);
                }
            )
        };

        $scope.deleteCat = function(data) {
            adminService.deleteCatById(data.id,
                function success() {
                    notifyService.showInfo("Successfully deleted category!");
                    $location.path('/admin/categories/list');
                },
                function error(err) {
                    notifyService.showError("Error while deleting category", err);
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

        $scope.getCategories();
    }
);
