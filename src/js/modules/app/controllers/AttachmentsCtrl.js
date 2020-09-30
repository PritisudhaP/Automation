angular.module('app').controller('AttachmentsCtrl', ['$scope', '$enApi', function($scope, $enApi) {

    $scope.filterExistingAttachments = function(arrName) {
        var model = $scope.attachCollection;
        var existingModel = $scope.data.item;

        if(existingModel != undefined && existingModel[arrName] && existingModel[arrName].length > 0) {
            angular.forEach(existingModel[arrName], function (item, index) {
                if(index === 0) {
                    model.filter += 'refKey:!' + item.refKey;
                } else {
                    model.filter += '&&refKey:!' + item.refKey;
                }
            });
        }
    };

    $scope.addAttachment = function(selected, arrName, parentDataName) {
        if(angular.isDefined(selected)) {

            // model depending on type of action 'new' vs 'edit'
            var model;

            //if($scope.data.type === 'new' && angular.isDefined(arrName) && angular.isDefined(parentDataName)) {
                console.info('parentDataName', parentDataName);

                if(!$scope.$parent.$root[parentDataName].data) {
                    $scope.$parent.$root[parentDataName].data = {};
                }
                model = $scope.$parent.$root[parentDataName].data;
            //} else {
            //    if(!$scope.attachments.data) {
            //        $scope.attachments.data = {};
            //    }
            //    model = $scope.attachments.data;
            //}

            // if new and no array, create
            if($scope.data.type === 'new' && angular.isDefined(arrName) && !model.hasOwnProperty(arrName)) {
                model[arrName] = [];
            }

            // for each selected: if new push to array, else push to batch array for post
            var batchArr = [];

            angular.forEach(selected, function(item) {

                if(!angular.isDefined(model[arrName])) {
                    model[arrName] = [];
                }

                model[arrName].push(item);

                //} else {
                //    batchArr.push(item);
               // }
            });

            // if not new set, post batch
            //if($scope.data.type != 'new') {
            //    $scope.attachments.data = batchArr;
            //
            //} //else {
            //    $scope.attachments = $enApi.object({
            //        name: 'attachments',
            //        path: '/api/v1/'+ $scope.data.apiPostPath,
            //        method: 'post',
            //        onPost: function(data){
            //            $scope.showScreen('inventory/transfers/' + data.id);
            //        }
            //    });
            //}
            $scope.closeModal();
        }

    };

    /**
     * @function removeAttachment()
     * @description Remove an attachment from a set or group
     * @param {Object} item object to be spliced
     * @param {String} modelName name of model
     * @param {String} arrName name of array within model that item will be spliced from
     * @param {String} itemIdentifier name of field used to determine match
     */
    $scope.removeAttachment = function(item, modelName, arrName, itemIdentifier) {
        console.log(modelName, arrName, itemIdentifier);
        for(var i = 0, l = $scope[modelName].data[arrName].length; i < l; i++) {
            console.log($scope[modelName].data[arrName][i][itemIdentifier]);
            if(item[itemIdentifier] === $scope[modelName].data[arrName][i][itemIdentifier]) {
                $scope[modelName].data[arrName].splice(i, 1);
                break;
            }
        }
    };

}]);
