(function () {
    angular.module('app')
        .controller('createUpdateStepCtrl', ['$scope', '$enApi', '$http', 'growl', 'util', createUpdateStepCtrl]);

    function createUpdateStepCtrl($scope, $enApi, $http, growl, util) {

        //====================================== Private ===============================//

        var COORELATION_READER_TYPE = 'correlationReaderType';
        var COORELATION_WRITER_TYPE = 'correlationWriterType';
        var WRITER_WATCHERS_LIST = [];
        var READER_WATCHERS_LIST = [];
        var CANCELABLE_WATCHERS = { READER: [], WRITER: [] };
        var clonnedData = angular.copy($scope.data);

        var addWatchersToReaderWriter = function (list) {
            if (list.length) {
                return $scope.$watchGroup(list, function (newVal) {
                    $scope.isValid = validateForm();
                }, true);
            }
        };

        (function () {
            if (angular.isObject($scope.data.chunkTasklet)) {
                for (var outerKey in $scope.data.chunkTasklet) {
                    if ($scope.data.chunkTasklet.hasOwnProperty(outerKey)) {
                        if ($scope.data.chunkTasklet[outerKey].propertyBag) {
                            for (var innerKey in $scope.data.chunkTasklet[outerKey].propertyBag) {
                                if ($scope.data.chunkTasklet[outerKey].propertyBag.hasOwnProperty(innerKey)) {
                                    if (~outerKey.indexOf('Reader')) {
                                        READER_WATCHERS_LIST.push('data.chunkTasklet.chunkReader.propertyBag.' + innerKey + '.value');
                                    } else {
                                        WRITER_WATCHERS_LIST.push('data.chunkTasklet.chunkWriter.propertyBag.' + innerKey + '.value');
                                    }
                                }
                            }
                        }
                    }
                }

                var readerFn = addWatchersToReaderWriter(READER_WATCHERS_LIST);
                var writerFn = addWatchersToReaderWriter(WRITER_WATCHERS_LIST);

                if (typeof readerFn === 'function') CANCELABLE_WATCHERS.READER.push(readerFn);
                if (typeof writerFn === 'function') CANCELABLE_WATCHERS.WRITER.push(writerFn);
            }
        })()

        var fetchApi = function (name, path) {
            $enApi.object({
                name: name,
                method: 'get',
                trigger: false,
                path: '/api/v1/correlation/' + path,
                onGet: function (res) {
                    // console.log(path);
                    var skipMandatory = false;
                    // console.log(skipMandatory);
                    if (res.key && res.value) {
                        if (name === COORELATION_READER_TYPE) {
                            $scope.data.chunkTasklet.chunkReader.propertyBag = {};
                            res.key.forEach(function (val, index) {
                                var obj = { name: val, value: '', type: res.value[index] };
                                $scope.data.chunkTasklet.chunkReader.propertyBag[val] = obj;
                                skipMandatory = ~$scope.NON_MANDATORY_FIELDS.indexOf(val)
                                if (!skipMandatory) {
                                    READER_WATCHERS_LIST.push('data.chunkTasklet.chunkReader.propertyBag.' + val + '.value');
                                }
                            });

                            var fn = addWatchersToReaderWriter(READER_WATCHERS_LIST);
                            if (typeof fn === 'function') {
                                CANCELABLE_WATCHERS.READER.push(fn);
                            }


                        } else if (name === COORELATION_WRITER_TYPE) {
                            $scope.data.chunkTasklet.chunkWriter.propertyBag = {};
                            res.key.forEach(function (val, index) {
                                var obj = { name: val, value: '', type: res.value[index] };
                                $scope.data.chunkTasklet.chunkWriter.propertyBag[val] = obj;
                                skipMandatory = ~$scope.NON_MANDATORY_FIELDS.indexOf(val);
                                if (!skipMandatory) {
                                    WRITER_WATCHERS_LIST.push('data.chunkTasklet.chunkWriter.propertyBag.' + val + '.value');
                                }
                            });
                            var fn = addWatchersToReaderWriter(WRITER_WATCHERS_LIST);
                            if (typeof fn === 'function') {
                                CANCELABLE_WATCHERS.WRITER.push(fn);
                            }
                        }
                    }
                }
            }).get();
        };

        var validateForm = function () {
            return (
                (typeof $scope.data.stepType === 'string' && $scope.data.stepType.length > 0) &&
                (typeof $scope.data.name === 'string' && $scope.data.name.length > 0) &&
                (typeof $scope.data.allowStartIfComplete === 'boolean') &&
                ($scope.data.stepType === 'CHUNK' ? $scope.data.chunkTasklet && $scope.data.chunkTasklet.chunkReader && typeof $scope.data.chunkTasklet.chunkReader.chunkReaderType === 'string' : true) &&
                ($scope.data.stepType === 'CHUNK' ? $scope.data.chunkTasklet && $scope.data.chunkTasklet.chunkWriter && typeof $scope.data.chunkTasklet.chunkWriter.chunkWriterType === 'string' : true) &&
                validateReaderWriter('chunkReader') &&
                validateReaderWriter('chunkWriter')
            );
        };

        /**
         * 
         * @param {string} type - chunkReader|chunkWriter
         */
        var validateReaderWriter = function (type) {
            var isValid = true;
            if ($scope.data.chunkTasklet && $scope.data.chunkTasklet[type] && $scope.data.chunkTasklet[type].propertyBag) {
                var propertyBag = $scope.data.chunkTasklet[type].propertyBag;
                for (var key in propertyBag) {
                    if (propertyBag.hasOwnProperty(key) && !~$scope.NON_MANDATORY_FIELDS.indexOf(key)) {
                        isValid = isValid && propertyBag[key].value;
                        if (propertyBag[key].type === 'file' && angular.isObject(propertyBag[key].value)) {
                            isValid = isValid && propertyBag[key].value.type === 'File'
                        }
                    }
                }
            }

            return isValid;
        };



        var removeWatchers = function (watchersList) {
            watchersList.forEach(function (item) {
                item();
                CANCELABLE_WATCHERS.length = 0;
            });
        };

        // var addScriptInput = function (inputs, scriptInput) {
        //     if (angular.isDefined(inputs)) {
        //         for (var key in inputs.data) {
        //             if (inputs.data[key].value) {
        //                 scriptInput[key] = inputs.data[key].value;
        //             }
        //         }
        //     }
        // };

        // var prepareInputs = function (context) {
        //     if (!angular.isObject(context.inputs)) {
        //         context.inputs = {};
        //     }
        //     return function (inputs) {

        //         addScriptInput(inputs, context.inputs);
        //         console.log($scope.data);
        //     }
        // };


        //======================================= Public ===========================//

        $scope.isValid = false;
        $scope.NON_MANDATORY_FIELDS = ['offset', 'fields', 'sort', 'query', 'keyword', 'collectionOverride'];
        $scope.tooltips = {
            name: 'Unique name for a step',
            stepType: 'Select Tasklet, when the job is a single granular task. Select Chunk, when the job to be run is complex and involves executing of tasks involving reads, processing and writes',
            preStep: 'Select script to be executed before the step',
            postStep: 'Select script to be executed after the step',
            preJob: 'Select script to be executed before the job',
            postJob: 'Select script to be executed after the job',
            taskletType: 'Select type of tasklet - Script if script is to be executed as a granular unit. Bean  - if existing bean is to be used',
            allowStartIfComplete: 'If checked, step will be executed again on job restart even if it was successfully completed',
            stepDisabled: 'If Checked, will disable the step from executing',
            concurrent: 'If Checked, will execute the step in parallel'
        }

        $scope.refChanged = function (step) {
            if (step.chunkTasklet) {
                if (step.chunkTasklet.chunkProcessor.referenceType === 'SCRIPT') {
                    delete step.chunkTasklet.chunkProcessor.beanRef;
                    $scope.addChunkScriptInput = (function () {
                        if (!$scope.data.chunkTasklet.chunkProcessor.script) {
                            $scope.data.chunkTasklet.chunkProcessor.script = {};
                        }
                        return util.prepareInputs($scope.data.chunkTasklet.chunkProcessor.script);
                    })();
                } else if (step.chunkTasklet.chunkProcessor.referenceType === 'BEAN') {
                    delete step.chunkTasklet.chunkProcessor.script
                }
            } else if (step.referenceTasklet) {
                if (step.referenceTasklet.referenceType === 'SCRIPT') {
                    delete step.referenceTasklet.beanRef;
                    $scope.addTaskletScriptInput = (function () {
                        if (!$scope.data.referenceTasklet.script) {
                            $scope.data.referenceTasklet.script = {};
                        }
                        return util.prepareInputs($scope.data.referenceTasklet.script);
                    })();
                } else if (step.referenceTasklet.referenceType === 'BEAN') {
                    delete step.referenceTasklet.script;
                }
            }

        };

        $scope.stepChanged = function (step) {
            if (step.stepType === 'CHUNK') {
                // remove tasklet data
                delete step.referenceTasklet;
                // add default values
                if (!$scope.data.chunkTasklet) {
                    $scope.data.chunkTasklet = {};
                }
                var commitInterval = $scope.data.chunkTasklet && $scope.data.chunkTasklet.commitInterval,
                    skipLimit = $scope.data.chunkTasklet && $scope.data.chunkTasklet.skipLimit,
                    retryLimit = $scope.data.chunkTasklet && $scope.data.chunkTasklet.retryLimit;
                if (!commitInterval && !skipLimit && !retryLimit) {
                    $scope.batchJobLimits.data.key.forEach(function (val, index) {
                        $scope.data.chunkTasklet[val] = parseInt($scope.batchJobLimits.data.value[index], 10);
                    });
                }
            } else if (step.stepType === 'REFERENCE') {
                // remove chunk data
                delete step.chunkTasklet;
            }
        };

        $scope.$watchGroup([
            function () { return $scope.data.stepType; },   //0
            function () { return $scope.data.name; },   //1
            function () { return $scope.data.allowStartIfComplete; },   //2
            function () { return $scope.data.chunkTasklet && $scope.data.chunkTasklet.chunkReader && $scope.data.chunkTasklet.chunkReader.chunkReaderType },    //6
            function () { return $scope.data.chunkTasklet && $scope.data.chunkTasklet.chunkWriter && $scope.data.chunkTasklet.chunkWriter.chunkWriterType }    //7
        ], function (newValArr, oldValArr) {
            $scope.isValid = validateForm();
        });

        $scope.onReaderWriterChange = function (type) {


            if (type === 'reader') {
                READER_WATCHERS_LIST.length = 0;
                removeWatchers(CANCELABLE_WATCHERS.READER);
                delete $scope.data.chunkTasklet.chunkReader.propertyBag;
                fetchApi(COORELATION_READER_TYPE, $scope.data.chunkTasklet.chunkReader.chunkReaderType + '_READER');
            } else if (type === 'writer') {
                WRITER_WATCHERS_LIST.length = 0;
                removeWatchers(CANCELABLE_WATCHERS.WRITER);
                delete $scope.data.chunkTasklet.chunkWriter.propertyBag;
                fetchApi(COORELATION_WRITER_TYPE, $scope.data.chunkTasklet.chunkWriter.chunkWriterType + '_WRITER');
            }
        };

        /**
             * @function loadChildren()
             * @description loads the sub-directories within the selected directory
             * @param {Object} branchNode - the branch node object
             * @param {string} childrenLabel - the children label to assign to.
             */

        $scope.loadChildren = function (branchNode, childrenLabel, onlyFile) {

            var url = '/api/v1/entry/entryId/' + branchNode.id + '/entries?length=-1';
            if (!onlyFile) {
                url += '&filterField=type&filterRegEx=Directory';
            }

            //check if the children for that branch node is already loaded?
            if (!branchNode.childrenLoaded) {
                $http({ 'method': 'GET', 'url': url })
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

        $scope.addPreStepInput = (function () {
            if (!$scope.data.preStepScript) {
                $scope.data.preStepScript = {};
            }
            return util.prepareInputs($scope.data.preStepScript);
        })();
        $scope.addPostStepInput = (function () {
            if (!$scope.data.postStepScript) {
                $scope.data.postStepScript = {};
            }
            return util.prepareInputs($scope.data.postStepScript);
        })();

        $scope.resetData = function () {
            angular.copy(clonnedData, $scope.data);
        }

    }
})();