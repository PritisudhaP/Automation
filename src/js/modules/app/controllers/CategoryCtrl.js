'use strict';

 angular.module('app').controller('CategoryCtrl', ['$scope','$rootScope','$apiCategory','$uuid','$enModal','$enApi','growl',function ($scope,$rootScope,$apiCategory,$uuid,$modal,$enApi,growl) {
    $scope.$apiCat          = $apiCategory;
    $scope.selectedCategory = $apiCategory.selectedCategory;
    $scope.catTreeModel     = $apiCategory.treeModel;
    $scope.catTree          = {};
    //$scope.new              = null;
    $scope.attrSets         = [];
    $scope.attrSetsFull     = [];

    $scope.initialize       = function(){
        $scope.getCatTree();
        $scope.listAttributeSets();
    };

    $scope.getCatTree = function(selectedNode){
        $scope.$apiCat.getTree(selectedNode);
    };

    $scope.refreshTree = function(){
        $scope.getCatTree();
    };

    $scope.parseInheritedSets = function(arr){
        $scope.inheritedAttrSets = [];
        if(!arr || arr.length < 1){
            $scope.attrSets = $scope.attrSetsFull.clone();
            return;
        }
        //$scope.selectedCategoryParents = $apiCategory.selectedCategoryParents = arr;

        var i, x, sets,
            reference = [],
            actual    = [], //parsed array containing only non inherited attr sets
            inherited = []; //array containing full inherited attr set objects.

        //build simple array of inherited attr set refnames
        for(i=0; i < arr.length; i++){
            sets = arr[i].attrSets;
            if(angular.isDefined(sets)) {
                for (x = 0; x < sets.length; x++) {
                    reference.push(sets[x].refName);
                }
            }
        }

        //iterate through full attr sets array and remove ones found in reference[]
        for(i=0; i < $scope.attrSetsFull.length; i++){
            if(reference.indexOf($scope.attrSetsFull[i].refName) < 0) {
                actual.push($scope.attrSetsFull[i]);
            }else{
                inherited.push($scope.attrSetsFull[i]);
            }
        }

        $scope.attrSets          = actual;
        $scope.inheritedAttrSets = inherited;
    };



    $scope.listAttributeSets = function(){

        $enApi.object({
            name: "attributeSetDefinition",
            method: "list",
            path: "/api/v1/attributeSetDefinition?length=-1",
            onGet: function (data) {
                $scope.attrSets = data;
            }
        }).get();

    };

    $scope.getCatInfo = function(id){
        var _data = $scope.$apiCat.getWithInherited(id);
           _data.then(function(data){
               $scope.selectedCategory = $apiCategory.selectedCategory = data.skuGroup;
               $scope.parseInheritedSets(data.parents);
        }, function(e){
                console.log('ERROR GETTING CAT DATA ['+$scope.selectedCategory.title+']');
                console.log(e);
        });
    };

    $scope.prepareNewCategory = function(){
        $scope.new = $scope.$apiCat.structure();
        $scope.new.isParent = true;

        if($scope.selectedCategory){
            angular.extend($scope.new.parentReference, {
                refName   : $scope.selectedCategory.refName,
                dataDomain: $scope.selectedCategory.dataDomains[0],
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

        delete $scope.new.isParent;

        $scope.$apiCat.save($scope.new)
        .then(function(data){
            $scope.getCatTree(data.refName);
            $scope.closeModal();
            $toast.create({
                className           : 'success',
                content             : ''+data.title+' created.'
            });

        }, function(e){
            console.log('Error saving category ['+$scope.selectedCategory.title+']');
            console.log(e);
        });
    };

    $scope.updateCategory = function(){

        var attrList = $scope.selectedCategory.skuAttributeSetDefinitionReferences;
        var fixedAttrList = [];

        for(var i=0; i < attrList.length; i++){
            fixedAttrList.push({
             refName        : attrList[i].refName,
             dataDomain     : attrList[i].dataDomains[0]
            });
        }
        $scope.selectedCategory.skuAttributeSetDefinitionReferences = fixedAttrList;

        $scope.$apiCat.update($scope.selectedCategory.id, $scope.selectedCategory)
        .then(function(data){
            $scope.getCatTree(data.refName);
            growl.success('Sku Group ' + data.title+' has been updated.');
        }, function(e){
            console.log('Error updating category ['+$scope.selectedCategory.title+']');
            console.log(e);
        });
    };

    $scope.$watch('catTree.currentNode', function(n,o){
        if(n && n!==o){
            $scope.getCatInfo(n.group.id);
        }
    });

    $scope.$on('catTreeModelUpdate', function() {
        $scope.catTree.selected = $scope.$apiCat.selected;
        $scope.catTreeModel = $scope.$apiCat.treeModel;
    });

    $scope.$on('$destroy', function() {
        // say goodbye to your controller here
        // release resources, cancel request...
    });
}]);
