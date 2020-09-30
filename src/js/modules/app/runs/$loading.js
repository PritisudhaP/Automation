(function() {
    angular.module('app').run(function ($rootScope) {
        $rootScope.loading = false;
        $rootScope.loadingText = '';
        $rootScope.$loading = function(bolShow,txt){
            $rootScope.loading = !!bolShow;
            $rootScope.loadingText = (!txt) ? 'Please Wait..' : txt;
        };

    });
})();
