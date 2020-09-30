myApp.controller('CapabilityCtrl', ['$scope', function($scope) {
    $scope.actions = [];
    $scope.changeDropDown = function() {
        //$scope.actions = $scope.capabilityTemplate.data.functionalDomainObjRef.actions;
    };
    /**
     * addCapability() Creates Capability input set
     */

    $scope.addCapabilityPermission = function(permission) {
        //$scope.objRef = {};
        //$scope.objRef.functionalDomainObjRef =
        //console.log('Permission: ' + permission);
        if (!(typeof permission === "undefined") && !(typeof permission.actions === "undefined"))  {
            for (var i = 0; i < permission.actions.length; i++) {
                var functionalPerm = {
                    functionalAction: "",
                    functionalDomainObjRef: {}
                };
                if (!(permission.domain === undefined)) {
                    functionalPerm.refName                           = permission.domain.refName + ':' + permission.actions[i].refName;
                    functionalPerm.functionalAction                  = permission.actions[i].refName;
                    functionalPerm.functionalDomainObjRef.refName    = permission.domain.refName;
                    functionalPerm.functionalDomainObjRef.dataDomain = permission.domain.dataDomains[0];
                    functionalPerm.functionalDomainObjRef.type  = "com.eis.core.api.v1.model.FunctionalDomain"
                    $scope.capability.data.functionalPermissions.push(functionalPerm);
                }
            }
        }

    };
    $scope.attachFunctionalPermission = function (permission)  {
        if (angular.isDefined($scope.capability)) {
            if (!angular.isDefined($scope.capability.data.functionalPermissions)) {
                $scope.capability.data.functionalPermissions = [];
            }

            for (var i = 0; i < permission.actions.length; i++) {
                var functionalPerm = {
                    functionalAction: "",
                    functionalDomainObjRef: {}
                };
                if (!(permission.domain === undefined)) {
                    functionalPerm.refName                           = permission.domain.refName + ':' + permission.actions[i].refName;
                    functionalPerm.functionalAction                  = permission.actions[i].refName;
                    functionalPerm.functionalDomainObjRef.refName    = permission.domain.refName;
                    functionalPerm.functionalDomainObjRef.dataDomain = permission.domain.dataDomains[0];
                    functionalPerm.functionalDomainObjRef.type  = "com.eis.core.api.v1.model.FunctionalDomain"
                    $scope.capability.data.functionalPermissions.push(functionalPerm);
                }
            }

        }
    };
    $scope.attachFunctionalPermissions = function (permissions)  {
        if (angular.isDefined($scope.capability)) {
            if (!angular.isDefined($scope.capability.data.functionalPermissions)) {
                $scope.capability.data.functionalPermissions = [];
            }
            for (var i = 0; i < permissions.length; i++ ) {
                for (var j = 0; j < permissions[i].actions.length; j++) {
                    var functionalPerm = {
                        functionalAction: "",
                        functionalDomainObjRef: {}
                    };
                    if (!(permissions[i].domain === undefined)) {
                        functionalPerm.refName                           = permissions[i].domain.refName + ':' + permissions[i].actions[j].refName;
                        functionalPerm.functionalAction                  = permissions[i].actions[j].refName;
                        functionalPerm.functionalDomainObjRef.refName    = permissions[i].domain.refName;
                        functionalPerm.functionalDomainObjRef.dataDomain = permissions[i].domain.dataDomains[0];
                        functionalPerm.functionalDomainObjRef.type  = "com.eis.core.api.v1.model.FunctionalDomain"
                        $scope.capability.data.functionalPermissions.push(functionalPerm);
                    }
                }
            }
            //$scope.role.data.capabilityPermissions.push.apply($scope.role.data.capabilityPermissions, permissions);
        }
    }
    /**
     * removeCapability() Removes Capability input set
     */
    $scope.removeCapabilityPermission = function(item) {
        var index = -1;
        var found = false;
        angular.forEach($scope.capability.data.functionalPermissions, function (fp) {
            index ++;
            if (!found && fp.refName === item.refName) {
                $scope.capability.data.functionalPermissions.splice(index, 1);
                found = true;
            }
        });
    };
    //$scope.modalModel = {domain: { actions: [] }}
    $scope.capabilityTemplate = {
        dataDomains: [],
        refName: "",
        functionalPermissions: []

    }

}]);
