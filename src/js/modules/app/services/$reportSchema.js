(function() {
    angular.module('app').factory('$reportSchemaService',['$http','$q','$timeout',function($http,$q,$timeout){

       return{
           getReportSchemaforEntity: function(entity){
           var requestedColumnsForEntity = [];
           var preferredColumnNamesForEntity = [];
           var deferred = $q.defer();
           $http({
               'method': 'GET',
               'url':'/api/v1/'+entity+'/reportSchema'
           }).success(function (data) {
               Object.keys(data).forEach(function (key) {
                   requestedColumnsForEntity.push(key);
                   preferredColumnNamesForEntity.push(data[key]);
               });
               $timeout(function() {
                   deferred.resolve({
                       "getRequestedColumns": requestedColumnsForEntity,
                       "getPreferredColumnNames": preferredColumnNamesForEntity
                   });
               });
           }).error(function(response){
               deferred.reject(response);
           });
           return deferred.promise;
       }
       }
    }]);
})();
