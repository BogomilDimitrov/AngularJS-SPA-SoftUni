'use strict';

// The RightSidebarController controls the content displayed in the right sidebar
app.controller('LeftSidebarController',
    function ($scope, $rootScope) {
        $scope.navBtnClicked = function(btnId) {
            $scope.navBtnId = btnId;
            $rootScope.$broadcast("navBtnSelectionChange", btnId);
        };

        $scope.statusCheck = function(status) {
            $scope.status = status;
            $rootScope.$broadcast("statusFilterSelectionChanged", status);
        };
    }
);
