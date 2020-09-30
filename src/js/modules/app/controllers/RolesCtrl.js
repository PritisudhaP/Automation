myApp.controller('RolesCtrl', ['$scope', function($scope) {

    $scope.addSelected = function (selected, domain) {
        for (var i = 0; i < selected.length; i++) {
            var obj = {
                permittedDataDomain : domain,
                capability : selected[i]
            }
            $scope.addCapability(obj);
        }
    }
    $scope.addCapability = function(capability) {
        //console.info(capability);

        if(angular.isDefined(capability)) {
           // capability.capability.dataDomains = new Array(capability.permittedDataDomain);
            capability.refName = capability.capability.refName + '|' + capability.permittedDataDomain;
            //capability.displayName = capability.capability.refName;
            $scope.role.data.capabilityPermissions.push(capability);
        }
    };

    $scope.editCapability = function(capability) {
        //console.info(capability);

        if(angular.isDefined(capability)) {
          //  capability.capability.dataDomains = new Array(capability.permittedDataDomain);
            capability.refName = capability.capability.refName + '|' + capability.permittedDataDomain;
            //capability.displayName = capability.capability.refName;
            for (var i = 0; i < $scope.role.data.capabilityPermissions.length; i++ ) {
                if ($scope.role.data.capabilityPermissions[i].refName === capability.refName) {
                    $scope.role.data.capabilityPermissions[i] = capability;
                }
            }

        }
    };
    $scope.attachCapability = function (capability)  {
        if (angular.isDefined($scope.role)) {
            if (!angular.isDefined($scope.role.data.capabilityPermissions)) {
                $scope.role.data.capabilityPermissions = [];
            }
           // capability.capability.dataDomains = new Array(capability.permittedDataDomain);
            capability.refName = capability.capability.refName + '|' + capability.permittedDataDomain;
            $scope.role.data.capabilityPermissions.push(capability);
        }
    };
    $scope.attachCapabilities = function (capabilities)  {
        if (angular.isDefined($scope.role)) {
            if (!angular.isDefined($scope.role.data.capabilityPermissions)) {
                $scope.role.data.capabilityPermissions = [];
            }
            for (var i = 0; i < capabilities.length; i++ ) {
                var c = {
                    capability: capabilities[i],
                    permittedDataDomain: capabilities[i].dataDomains[0],
                    refName: capabilities[i].refName + '|' + capabilities[i].dataDomains[0]
                }
                //capabilities[i].capability.dataDomains = new Array(capabilities[i].permittedDataDomain);
                //capabilities[i].refName = capabilities[i].capability.refName + '|' + capabilities[i].permittedDataDomain;
                $scope.role.data.capabilityPermissions.push(c);
            }
            //$scope.role.data.capabilityPermissions.push.apply($scope.role.data.capabilityPermissions, capabilities);
        }
    }
    /**
     * removeCapability() Removes capability from role
     */
    $scope.removeCapability = function(item) {
        $scope.role.data.capabilityPermissions.splice(item, 1);
    };

    $scope.roleTemplate = {
        dataDomains: [],
        refName: '',
        capabilityPermissions: [],
        roleType: 'USER_ROLE'
    };

}]);
