(function() {
    angular.module('app')
        .controller('DownloadCtrl', ['$enApi', '$scope', '$rootScope', function($enApi, $scope, $rootScope) {

            $scope.downloadReport = function(id,name,type,inputs) {

                var mimeType, ext;

                switch (type.toLowerCase()) {
                    case 'pdf':
                        mimeType = 'application/pdf';
                        ext = 'pdf';
                        break;
                    case 'csv':
                        mimeType = 'text/csv';
                        ext = 'csv';
                        break;
                    default:
                        mimeType = 'text/plain';
                        ext = 'txt';
                }

                if (angular.isDefined(inputs)) {
                var downloadReport = $enApi.object({
                    name: 'downloadReport',
                    path: '/api/v1/reporting/reportLayoutDefinition/id/' + id + '/render',
                        data: inputs,
                        method: 'post',
                        config: {
                            responseType: 'arraybuffer',
                            headers: {
                                'Accept': mimeType
                            }
                        },
                        onBeforePost: function () {
                            $rootScope.$loading(true);
                        },
                        onPost: function (data) {
                            $rootScope.$loading(false);
                            var blob = new Blob([data], {
                                type: mimeType
                            });
                            saveAs(blob, name + '.' + ext);
                        },
                        onError: function (data) {
                            $rootScope.$loading(false);
                        }
                    });
                    downloadReport.post();
                } else {

                    var downloadReport = $enApi.object({
                        name: 'downloadReport',
                        path: '/api/v1/reporting/reportLayoutDefinition/id/' + id + '/render',
                    method: 'get',
                    config: {
                        responseType: 'arraybuffer',
                        headers: {
                            'Accept': mimeType
                        }
                    },
                    onBeforeGet: function(){
                        $rootScope.$loading(true);
                    },
                    onGet: function(data){
                        $rootScope.$loading(false);
                        var blob = new Blob([data], {
                            type: mimeType
                        });
                        saveAs(blob, name + '.'+ext);
                    },
                    onError: function(data) {
                        $rootScope.$loading(false);
                    }
                });
            }


            };
        }]);
})();
