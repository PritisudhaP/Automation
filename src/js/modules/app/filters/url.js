(function () {
    /**
     * Here you can add filters that return REST URLs
     */
	 angular.module('app').filter('sharedLink',['$rootScope',function ($rootScope) {
        return function (url) {
            if (!url) { return ''; }

            var id = url.toString().trim();

            return  $rootScope.baseURL.getServerPath()+"/api/v1/sharedLink/id/"+id+"/download";
        };
    }]);
})();
