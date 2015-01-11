'use strict';

app.factory('adminService',
    function ($http, baseServiceUrl, authService) {
        return {
            getUserAds: function (params, success, error) {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + '/api/admin/ads',
                    headers: authService.getAuthHeaders(),
                    params: params
                };
                $http(request).success(success).error(error);
            },

            approveAdById: function (id, success, error) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/admin/ads/approve/' + id,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            rejectAdById: function (id, success, error) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/admin/ads/reject/' + id,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            deleteAdById: function (id, success, error) {
                var request = {
                    method: 'DELETE',
                    url: baseServiceUrl + '/api/admin/ads/' + id,
                    headers: authService.getAuthHeaders()
                };
                $http(request).success(success).error(error);
            },

            editAd: function (id, data, success, error) {
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + '/api/admin/ads/' + id,
                    headers: authService.getAuthHeaders(),
                    data: data
                };
                $http(request).success(success).error(error);
            }
        }
    }
);