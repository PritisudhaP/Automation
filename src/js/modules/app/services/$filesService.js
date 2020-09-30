(function() {
    angular.module('app').factory('$fileService',['$enApi','$q','$timeout',function($enApi,$q,$timeout){
        var directories = {};

        var checkParent = function(parentFileEntryId,ary,deferred){
            if(angular.isDefined(parentFileEntryId)){
                getParents(parentFileEntryId,ary).then(function(ary){
                    deferred.resolve(ary);
                });
            }else{
                $timeout(function(){
                    deferred.resolve(ary);
                });
            }
        };

        var getParents = function(parentFileEntryId,ary){
            var deferred = $q.defer();

            var objParent = directories[parentFileEntryId];
            if(objParent!==undefined){
                ary.unshift({name:objParent.name,id:objParent.id});
                checkParent(objParent.parentFileEntryId,ary,deferred)
            }else{
                var $fileServiceHttp = $enApi.object({
                    "name": "$fileServiceHttp",
                    "path": "/api/v1/entry/id/"+parentFileEntryId,
                    "method": "get",
                    "trigger":false
                });
                $fileServiceHttp.get().then(function(data){
                    directories[data.id] = data;
                    ary.unshift({name:data.name,id:data.id});
                    checkParent(data.parentFileEntryId,ary,deferred);
                    $fileServiceHttp.destroy();
                },function(){
                    deferred.resolve(ary);
                    $fileServiceHttp.destroy();
                });
            }

            return deferred.promise;
        };

        return {
            getBreadCrumb: function(obj){ //requires current file object
                var deferred = $q.defer();
                var aryCrumb = [];

                //Remember name for later use
                if(obj.type==='Directory'){
                    directories[obj.id] = obj;
                    aryCrumb.push({name:obj.name,id:obj.id});
                }

                checkParent(obj.parentFileEntryId,aryCrumb,deferred);
                return deferred.promise;
            }
        }
    }]);
})();