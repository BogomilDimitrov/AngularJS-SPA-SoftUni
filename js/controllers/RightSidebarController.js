'use strict';

// The RightSidebarController controls the content displayed in the right sidebar
app.controller('RightSidebarController',
    function ($scope, $rootScope, categoriesService, townsService) {
        $scope.categories = categoriesService.getCategories();
        $scope.townService.getTowns();
    }
);
