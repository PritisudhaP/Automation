(function() {
    angular.module('app').filter('preferenceLevelFilter', function () {
        return function (item) {
            switch (item) {
                case -1:
                    return item + " (Requests never sent)";
                    break;

                case 0:
                    return  item + " (Requests sent but responses ignored)";
                    break;

                case 1:
                    return item + " (Requests sent and responses considered)";
                    break;
            }
        };
    });
})();
