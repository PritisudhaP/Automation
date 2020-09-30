(function() {
    angular.module('app').filter('jsonLength', function() {
        return function(map) {
            return Object.keys(map).length || 0;
        }
    });
})();
