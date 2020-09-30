(function () {
    angular.module('app')
        .controller('ImportCtrl', ['$scope', '$enApi', 'Upload', function ($scope, $enApi, Upload) {


            /**
             * @function import()
             * @description uploads files
             * @param {string} files - files to upload
             */

            $scope.import = function (files) {
                // Handles multiple files and single files
                if (files && files.length) {
                    Upload.upload({
                        url: '/api/v1/csvCollectionImport/uploadCSVFile',
                        file: files,
                        fields: {
                            dataDomain: $scope.import.data.domain,
                            fullModelClassName: $scope.import.data.objModelClassName,
                            serviceName: $scope.import.data.serviceName,
                            updateObjects: $scope.import.data.updateObjects
                        }
                    }).progress(function (evt) {
                        console.log(evt.loaded, evt.total, parseInt(100.0 * evt.loaded / evt.total));
                        $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
                        $scope.uploadComplete = false;
                        //  $rootScope.files.refresh();
                    }).success(function (data, status, headers, config) {
                        $scope.uploadComplete = true;
                        // $rootScope.files.refresh();
                    }).error(function (data, status, headers, config) {
                        $scope.uploadComplete = true;
                        $scope.errorMessage = data.message || 'File upload error!';
                    })
                        .finally(function () {
                            // $scope.files is ngModel, use $rootScope or change ngModel name
                            $rootScope.files.refresh();
                        });
                }
            };
        }]);
})();
