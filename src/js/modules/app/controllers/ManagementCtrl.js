(function() {
    angular.module('app')
        .controller('ManagementCtrl',  ['$scope','$enApi', function ($scope,$enApi) {


            var structure = function(){
                return {
                    title       : '',
                    refName     : '',
                    description : '',
                    skuAttributeSetDefinitionReferences:[],
                    locked      : false,
                    parentReference : {
                        refName     : '',
                        dataDomain  : ''
                    }
                };
            };

            $scope.prepareNewCategory = function(){
                $scope.new = structure();
                $scope.new.isParent = true;

                if($scope.$parent.data){
                    angular.extend($scope.new.parentReference, {
                        refName   : $scope.$parent.data.refName,
                        dataDomain: $scope.$parent.data.dataDomains[0],
                        type      : 'com.eis.ssit.api.v1.model.SkuGroup'
                    });
                    $scope.new.isParent = false;
                }
            };

            $scope.save = function(){
                /*
                 OBJECT BEING SAVED SHOULD LOOK JUST LIKE THIS

                 {
                 title       : 'Hot Dogs',
                 refName     : 'hot_dogs',
                 description : 'Some goofy description about hot dogs.',
                 skuAttributeSetDefinitionReferences:[
                 {"refName": "allergens",
                 "dataDomain": "com.nassuacandy"
                 },
                 {"refName": "edibles",
                 "dataDomain": "com.nassuacandy"
                 },
                 {"refName": "universalItemData",
                 "dataDomain": "com.nassuacandy"
                 }
                 ],
                 parentReference : {
                 "refName"       : 'confections',
                 "dataDomain": "com.nassuacandy"
                 }
                 }

                 */

                if($scope.new.isParent === true){
                    delete $scope.new.parentReference;
                }

                $scope.new.displayName = $scope.new.title;
                delete $scope.new.isParent;

               $enApi.object({
                        method:'post',
                        data:$scope.new,
                        name:'saveSkuGroup',
                        path:'/api/v1/skuGroup',
                   onPost:function(){
                       $scope.closeModal();
                   }
               }).post();
            };

            $scope.getTree = function(selectedNode){

                return $enApi.object({
                        name:'skuGroupTree',
                        method:'get',
                        trigger: false,
                        path: '/api/v1/skuGroup/tree'
                    })
                    .get()
                    .then(function(data) {
                        $scope.treeModel = data;
                    });
            };

            $scope.saveAttrSet = function(){

                $scope.bolAttrSetSaving = true;
                var aryNewSet = [];
                var buildAttrSetDefs = function() {
                    var lngAttrSetDefs = $scope.attrSet.data.items.length;
                    var objGoodList = {};

                    /*build valid list*/
                    for (var i = 0; i < lngAttrSetDefs; i++) {
                        var objDef = $scope.attrSet.data.items[i];
                        var lngAryDef = objDef.attributeSetDefinitionReferences.length;
                        var bolFound = false;
                        for (var x = 0; x < lngAryDef; x++) {
                            var objSetDef = objDef.attributeSetDefinitionReferences[x];
                            if (objSetDef.refName === $scope.attrSet.data.items[i].refName) bolFound = true;
                        }
                        objGoodList[objDef.refName] = true;
                        if (bolFound === false) {
                            objDef.attributeSetDefinitionReferences.push({
                                refName: $scope.attributeSetDefinition.data.refName,
                                dataDomain: $scope.attributeSetDefinition.data.dataDomain || $scope.attributeSetDefinition.data.dataDomains[0] ,
                                type: "com.eis.ssit.api.v1.model.AttributeSetDefinition"
                            });
                        }
                        aryNewSet.push(objDef);
                    }

                    /*remove list*/
                    var lngAttrList = $scope.attrList.length;
                    for (var i = 0; i < lngAttrList; i++) {
                        var objDef = $scope.attrList[i];
                        var lngAryDef = objDef.attributeSetDefinitionReferences.length;
                        var bolFound = false;
                        var cleanSetList = [];
                        for (var x = 0; x < lngAryDef; x++) {
                            var objSetDef = objDef.attributeSetDefinitionReferences[x];
                            if (objSetDef.refName === $scope.attrSet.data.items.refName) {
                                bolFound = true;
                            } else {
                                cleanSetList.push(objSetDef);
                            }
                        }
                        if (bolFound === true && objGoodList[objDef.refName] === undefined) {
                            objDef.attributeSetDefinitionReferences = cleanSetList;
                            aryNewSet.push(objDef);
                        }
                    }
                };

                buildAttrSetDefs();

                var updateList = $enApi.object({
                    name: 'attributeDefinition',
                    path: '/api/v1/attributeDefinition/updateList/',
                    method: 'get',
                    config  : {showGrowlError:false},
                    data: aryNewSet,
                    onPut: function() {

                        //$scope.listAttributes();
                        $scope.bolAttrSetSaving = false;

                    }
                }).put(); 
            };

        $scope.loadChildren = function(branch, node){

            console.log(branch);
            console.log(node);

        }

        }]);
})();
