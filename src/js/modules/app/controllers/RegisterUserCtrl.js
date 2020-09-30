(function() {
    angular.module('app')
        .controller('RegisterUserCtrl', ['$rootScope', '$scope', '$http', 'growl', '$location',  function($rootScope, $scope, $http, growl, $location) {

            if ($location.search().token) {
                $scope.userToken = $location.search().token;
                $scope.activeScreen = 'resetPassword';
            } else {
                $scope.activeScreen = 'login';
            }

            /**
            * registerSuccess() register successul
            *
            */
            $scope.registerSuccess = function() {
             growl.success('Registration Request was successful!');
            };
        }]);
})();
