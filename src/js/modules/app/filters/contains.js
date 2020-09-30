(function() {
    angular.module('app').filter('contains', function() {
        return function (array, needle) {
            return array.indexOf(needle) >= 0;
        };
    });
})();
