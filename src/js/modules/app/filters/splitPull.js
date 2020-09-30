(function() {
    angular.module('app').filter('splitPull', function() {
        return function(str,splitter,ary) {
            return str.split(splitter)[ary];
        }
    });
})();
