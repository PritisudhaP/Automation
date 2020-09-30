(function () {
    angular.module('app')
        .controller('ShippingRateCtrl', ['$rootScope','$scope','$http', function ($rootScope,$scope,$http) {

            /**
             * checkConfigType() check the config type before loading the screen.
             */

            $scope.urlRegex = /^(http|https):\/\/[^ "]+$/gi

            $scope.checkConfigType = function(shippingRateConfiguration) {

                if (angular.isDefined(shippingRateConfiguration)) {
                    $scope.configType = (shippingRateConfiguration.data.additionalHeaderName === 'x-license-key') ? 'AcceleRate' : 'MercuryGate';
                }

                if ($scope.configType === 'AcceleRate') {
                    shippingRateConfiguration.data.userId = 'dummy';
                    shippingRateConfiguration.data.password = 'dummy'
                }

                var fileEntryRefName = shippingRateConfiguration.data.requestResponseDirEntry.refName;
                var fileEntryDataDomain = (typeof shippingRateConfiguration.data.requestResponseDirEntry.dataDomain != 'undefined') ?
                    shippingRateConfiguration.data.requestResponseDirEntry.dataDomain :
                    shippingRateConfiguration.data.requestResponseDirEntry.dataDomains[0];
                shippingRateConfiguration.data.requestResponseDirEntry = {};
                shippingRateConfiguration.data.requestResponseDirEntry.refName = fileEntryRefName;
                shippingRateConfiguration.data.requestResponseDirEntry.dataDomain = fileEntryDataDomain;
                shippingRateConfiguration.data.requestResponseDirEntry.type = 'FileSystemEntry';
            };

            //set the dateOptions
            var DateNow = Date.now();
            $scope.dateOptions = {
                outputFormat    : 'UTC',
                displayFormat   : 'MM/dd/yyyy hh:mm:ss a',
                startDate       : DateNow,
                endDate         : DateNow + 864000000,
                mainDate        : DateNow,
                outputDate      : '',
                emptyDate       : ''
            };

            $scope.storeAccessKeys = function(obj){
                $scope.accessKey = obj.data.accessKey;
                $scope.secretAccessKey = obj.data.secretAccessKey;
            };

            $scope.setIgnoreKeys = function(obj){
                //detect if the accesskey is edited
               return obj.data.ignoreKeys = ($scope.action=='edit' && ($scope.accessKey === obj.data.accessKey || $scope.secretAccessKey === obj.data.secretAccessKey))?true:false;
            };

            /**
             * @function loadChildren()
             * @description loads the sub-directories within the selected directory
             * @param {Object} branchNode - the branch node object
             * @param {string} childrenLabel - the children label to assign to.
             */

            $scope.loadChildren = function(branchNode,childrenLabel){

                //create a url with the branchNode id
                var url = '/api/v1/entry/entryId/'+branchNode.id+'/entries?length=-1&filterField=type&filterRegEx=Directory';

                //check if the children for that branch node is already loaded?
                if(!branchNode.childrenLoaded) {
                    $http({'method': 'GET', 'url': url})
                        .success(function (data) {
                            //open the branch node
                            branchNode.$open();
                            //assign the labels
                            branchNode[childrenLabel] = data.items;
                            //change the boolean childrenLoaded
                            branchNode.childrenLoaded = true;
                        }).error(function (err, status) {
                            growl.error('Status: ' + status + ' ' + err);
                        })
                        .finally(function () {
                            // $scope.files is ngModel, use $rootScope or change ngModel name
                            $rootScope.files.refresh();
                        });
                }
            };
        }]);
})();
