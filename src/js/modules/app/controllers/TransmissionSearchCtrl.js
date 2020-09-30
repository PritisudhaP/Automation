myApp.controller('TransmissionSearchCtrl', ['$scope', '$enApi', '$filter','$http', function($scope, $enApi, $filter, $http) {

	
	  $scope.directions = [
      {
        name: 'ALL',
        value: ''
      },
      {
        name: 'INBOUND',
        value: 'INBOUND'
      },
      {
        name: 'OUTBOUND',
        value: 'OUTBOUND'
      }];	
      
	      $scope.statuses = [
      {
        name: 'ALL',
        value: ''
      },
      {
        name: 'NEW',
        value: 'NEW'
      },
      {
        name: 'INPROCESS',
        value: 'INPROCESS'
      },
      {
        name: 'ROUTED',
        value: 'ROUTED'
      },
      {
        name: 'FAILED',
        value: 'FAILED'
      },
      {
        name: 'DELIVERED',
        value: 'DELIVERED'
      },
      {
        name: 'RECEIVED',
        value: 'RECEIVED'
      },
      {
        name: 'FINISHED',
        value: 'FINISHED'
      },
      {
        name: 'DISCONNECTED',
        value: 'DISCONNECTED'
    }];
    $scope.communicationProtocols = [
      {
        name: 'ALL',
        value: ''
      },
      {
        name: 'AS2',
        value: 'AS2'
      },
      {
        name: 'FTP',
        value: 'FTP'
      },
      {
        name: 'HTTP',
        value: 'HTTP'
      },
      {
        name: 'SFTP',
        value: 'SFTP'
    }];
    
    
    $scope.buildFilter = function() {
		$scope.transmission.filter = $scope.buildFilterString($scope.buildFilterMap(), $scope.buildDateString('startDateTime'));	
	}
	
	
	$scope.buildFilterString = function(obj,strFilter){
        var filter = '';
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if(obj[key]!=='' && obj[key]!==undefined && obj[key]!==null){
                    if(filter!=='') filter += '&&';
                    filter += key +':'+obj[key]+'';
                }
            }
        }


        if(filter!==''){
            if(strFilter!=='' && strFilter!==undefined){
                return '('+strFilter+')&&('+filter+')';
            }else{
                return '('+filter+')';
            }
        }else{
            return strFilter;
        }
    };
	
	
	$scope.buildFilterMap = function() {
		
        var filterMap = {
        		          'dataDomain':$scope.transmissionSearchParams.account,
        		          'direction':$scope.transmissionSearchParams.direction,
        	              'status':$scope.transmissionSearchParams.status,
        	              'communicationProtocol': $scope.transmissionSearchParams.communicationProtocol};
           
        
        return filterMap;		      
    };	

    



       $scope.buildDateString = function (fieldName) {
            var filterString = '';

            var sTime = "00:00:01";
            var eTime = "23:59:59";

           

            if ($scope.transmissionSearchParams.startDate !== null && $scope.transmissionSearchParams.startDate !== undefined && $scope.transmissionSearchParams.startDate !== '') {
                if ($scope.transmissionSearchParams.startTime !== undefined && $scope.transmissionSearchParams.startTime !== null && $scope.transmissionSearchParams.startTime !== '') {
                    sTime = $scope.transmissionSearchParams.startTime.toTimeString().substring(0, 8);
                }
                if (filterString !== '') {
                    filterString = filterString + "&&";
                }
                filterString = filterString + fieldName + ":>=" + $scope.transmissionSearchParams.startDate + "T" + sTime;
            }

            if ($scope.transmissionSearchParams.endDate !== null && $scope.transmissionSearchParams.endDate !== undefined && $scope.transmissionSearchParams.endDate !== '') {
                if ($scope.transmissionSearchParams.endTime !== undefined && $scope.transmissionSearchParams.endTime !== null && $scope.transmissionSearchParams.endTime !== '') {
                    eTime = $scope.transmissionSearchParams.endTime.toTimeString().substring(0, 8);
                }
                if (filterString !== '') {
                    filterString = filterString + "&&";
                }
                filterString = filterString + fieldName + ":<=" + $scope.transmissionSearchParams.endDate + "T" + eTime;
            }
            
            if($scope.transmissionSearchParams.fileName !== null && $scope.transmissionSearchParams.fileName !== undefined && $scope.transmissionSearchParams.fileName !== '') {
            	filterString = filterString + 'fileNames:%'+$scope.transmissionSearchParams.fileName+'%';
            	
            }

            return filterString;
        };

}]);
