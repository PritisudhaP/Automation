(function() {
    angular.module('app')
        .controller('SystemLogCtrl', ['growl', '$http', '$interpolate', '$scope', function(growl, $http, $interpolate, $scope) {

            $scope.page = {
                'loading': false
            };

            /**
             * Generate url to fetch
             */
            function getUrl() {
                var url = '/api/v1/logEvent/getFilteredList?offset={{ offset }}&length=500&timestamp={{ timestamp() }}&logLevel={{ logLevel.join(\',\') }}';

                // Filter by User Id
                if ( $scope.userId && $scope.userId.id ) {
                    url += '&userId={{ userId.id }}';
                }

                // Filter by Session Id
                if ( $scope.sessionId && $scope.sessionId.id ) {
                    url += '&sessionId={{ sessionId.id }}';
                }

                // Filter by Transaction Id
                if ( $scope.transactionId && $scope.transactionId.id) {
                    url += '&txId={{ transactionId.id }}';
                }

                // Filter by Transaction Id
                if ( $scope.keyword) {
                    url += '&keyword={{ keyword }}';
                }

                // Filter by Date Range
                if ($scope.startDate){
                    if($scope.startTime){
                    	var startHours = $scope.startTime.getHours();
                    	var startMinutes = $scope.startTime.getMinutes();
                    	var startTime = startHours + ':' + startMinutes;
                    	url += '&startDateTime={{ startDate }}%20'+startTime;
                    } else {
                    	url += '&startDateTime={{ startDate }}%2000:00';
                    }
                }
                if ($scope.endDate) {
                    if($scope.endTime){
                        var endHours = $scope.endTime.getHours();
                        var endMinutes = $scope.endTime.getMinutes();
                        var endTime = endHours + ':' + endMinutes;
                        url += '&endDateTime={{ endDate }}%20'+endTime;
                    } else {
                        url += '&endDateTime={{ endDate }}%2023:59'
                    }
                }

                url = $interpolate(url)($scope);
                return url;
            }


            /**
             * Update url with latest parameters and fetch data
             */
            function fetchData() {
                var url = getUrl();

                $scope.page.loading = true;
                $http
                    .get(url)
                    .success(processLogData)
                    .error(function(error){
                        growl.error('There was an error fetching the system log data.\nPlease try again later.');
                    });
            }


            /**
             * Combine all the fields into individual lines
             */
            function processLogData(data) {
                var logs = $scope.formattedLogs || '',
                    filters = $scope.filters,
                    userIds = {},
                    sessionIds = {},
                    transactionIds = {};


                /**
                 * Update search filters based on log entries
                 */
                function updateId( ids, obj, modelName ) {
                    var oldModel = $scope[ modelName ],
                        selectedIndex;

                    // add blank entry so user can undo filter selection
                    if (!obj.length) obj.push( { 'id': '' } );

                    // reset the object's values
                    obj.splice(1, obj.length - 1 );

                    // Populate object with new values
                    Object
                        .keys( ids )
                        .sort()
                        .forEach(function(key, index){
                            obj.push( { 'id': key } );
                            // Keep previous item selected
                            if (oldModel && (key === oldModel.id)) {
                                // Offset by 1 for empty object at index 0
                                selectedIndex = index + 1;
                            }
                        });

                    // Select previous values before update
                    $scope[ modelName ] = obj[ selectedIndex ];
                }

                // Process each log
                data.items.forEach(function(entry) {
                    var log = new Date(entry.date) + ':' + entry.level + ':' + (entry.hasOwnProperty('source')?entry.source.className:' ')
                        + ':' + (entry.hasOwnProperty('source')?entry.source.lineNumber:' ') + ':' + entry.message + '\n';
                    // lets check for throwables
                    var throwables = '';
                    if(entry.thrown) {
                        throwables = entry.thrown.type + (entry.thrown.message?(' : ' + entry.thrown.message):'') +'\n';
                        if (entry.thrown.stackTrace) {
                            entry.thrown.stackTrace.forEach(function (item) {
                                if (item) {
                                    throwables += '\t' + item.fileName + ':' + item.lineNumber + ':' + item.className + '\n';
                                }
                            });
                        }
                        if (entry.thrown.cause) {
                            throwables += 'Caused by ' + entry.thrown.cause.type + ' : ' + entry.thrown.cause.message + '\n';

                            if (entry.thrown.cause.stackTrace) {
                                entry.thrown.cause.stackTrace.forEach(function (item) {
                                    if (item) {
                                        throwables += '\t' + item.fileName + ':' + item.lineNumber + ':' + item.className + '\n';
                                    }
                                });
                            }
                        }
                    }
                    log += throwables;
                    logs += log;

                    // list of filters
                    if(entry.hasOwnProperty('contextMap')){
                        if(entry.contextMap.userId){
                            userIds[ entry.contextMap.userId ] = '';
                        }

                        if(entry.contextMap.sessionId){
                            sessionIds[ entry.contextMap.sessionId ] = '';
                        }

                        if(entry.contextMap.txId){
                            transactionIds[ entry.contextMap.txId ] = '';
                        }
                    }
                });

                // Update Ace editor
                $scope.formattedLogs = logs;

                // Show page as ready to go
                $scope.page.loading = false;

                // Update UserId filter
                updateId( userIds, filters.userIds, 'userId');

                // Update Session Filter
                updateId( sessionIds, filters.sessionIds, 'sessionId' );

                // Update Transaction Filter
                updateId( transactionIds, filters.transactionIds, 'transactionId' );
            }

            // Init the scope
            $scope.reset = function() {
                var filters;

                $scope.offset = 0;
                $scope.logLevel = [];
                $scope.chkModels = {
                    'Info': true,
                    'Debug': true,
                    'Warn': true,
                    'Error': true
                };
                // Initial log level
                $scope.logLevel = ['INFO','DEBUG','WARN','ERROR'];

                // Search filters
                filters = $scope.filters = {
                    userIds: [],
                    sessionIds: [],
                    transactionIds: []
                };
                $scope.userId = filters.userIds[0];
                $scope.sessionId = filters.sessionIds[0];
                $scope.transactionId = filters.transactionIds[0];

                $scope.startDate = '';
                $scope.endDate = '';
                $scope.formattedLogs = '';
                $scope.keyword = '';

                fetchData();
            };

            $scope.toggleLevels = function(value) {
                value = value.toUpperCase();
                var logLevel = $scope.logLevel,
                    pos = logLevel.indexOf(value);
                if (~pos) {
                    logLevel.splice(pos, 1);
                }
                else {
                    logLevel.push(value);
                }

                // Default to debug
                if (!logLevel.length) {
                    $scope.chkModels.Debug = true;
                    logLevel.push('DEBUG');
                }
            };

            $scope.timestamp = function() {
                return new Date().getTime();
            };

            $scope.nextPage = function() {
                $scope.offset = $scope.offset + 500;
                fetchData();
            };


            $scope.refresh = function() {
                $scope.formattedLogs = '';
                $scope.offset = 0;
                fetchData();
            };


            // Inital loading of form
            $scope.reset();
        }]);
})();
