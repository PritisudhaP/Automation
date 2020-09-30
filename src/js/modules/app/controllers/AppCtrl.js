myApp.controller('AppCtrl', ['$scope', '$enLocalStorage', '$location','$rootScope','$enApi', '$enspireAuth',function($scope,$enLocalStorage, $location,$rootScope,
$enApi, $enspireAuth)
{

    /**
     * copyModelInfo() Copies model
     *
     * @param  modelName name of model
     * @param  modelFrom model to copy from
     * @param  modelTo model to copy to
     */
    $scope.copyModelInfo = function(modelName, modelFrom, modelTo) {
        var model = $scope[modelName].data.header;

        model[modelTo] =  angular.copy(model[modelFrom], {});

        // TODO: Add watch
    };

    $scope.getDateTime = function() {
        return new Date();
    };

    $rootScope.fetchSearchConfig = function() {

        if($enspireAuth.isLoggedIn()){
            $enApi.object({
                name: 'searchType',
                path: '/api/v1/correlation/UISearchType/',
                method: 'get'
            }).get().then(function(searchType){
                $enLocalStorage.set('searchConfig', searchType.value);
            });
        }
    };

    $rootScope.isElasticSearchEnabledFor = function(obj){
       return $enLocalStorage.get('searchConfig') != null &&  $enLocalStorage.get('searchConfig').indexOf(obj) > -1;
    };

    $rootScope.$on('SEARCH_CONFIG_UPDATED', function(event, searchConfig){
        if(searchConfig.displayName == 'UISearchType'){
            $enLocalStorage.set('searchConfig', searchConfig.value);
        }
    });


    $rootScope.encode = function(str){
        return encodeURIComponent(str)
            .replace(/!/g, '%21')
            .replace(/'/g, '%27')
            .replace(/\(/g, '%28')
            .replace(/\)/g, '%29')
            .replace(/\*/g, '%2A');
    }

    $rootScope.deleteProperty = function(obj, propertyToDelete)
    {
         console.log(">>>> DELETE PROPERTY !!!!");
         delete obj[propertyToDelete];

    };

    /**
     * baseURL to fetch the server location
     * @type {{port: Function, host: Function, protocol: Function, getServerPath: Function}}
     */
     $rootScope.baseURL = {


        port:function(){
        var result = $location['port'].call($location);
        return angular.isObject(result) ? angular.toJson(result) : result;
        },
        host:function(){
        var result = $location['host'].call($location);
        return angular.isObject(result) ? angular.toJson(result) : result;
        },
        protocol:function(){
        var result = $location['protocol'].call($location);
        return angular.isObject(result) ? angular.toJson(result) : result;
        },
        getServerPath:function(){
        return this.protocol()+"://"+this.host()+":"+this.port();
        }
    };



}]);
