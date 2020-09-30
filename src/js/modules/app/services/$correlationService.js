(function() {
    angular.module('app').factory('$correlationService',['$enApi','$q','$timeout',function($enApi,$q,$timeout){

        return {
            getCorrelation: function(correlationName){ 
                var deferred = $q.defer();
                var myCorrelationData = {};
                var correlationService =  $enApi.object({
                        name: 'correlationName',
                        path: '/api/v1/correlation/CountryTo2CharCountryCode',
                        method: 'get',
                    });

                 return correlationService;
            }
        };
    }]);
})();