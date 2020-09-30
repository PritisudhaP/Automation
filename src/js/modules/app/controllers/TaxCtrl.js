(function() {
    'use strict';

    angular.module('app').controller('TaxCtrl', ['$scope', function($scope) {

        $scope.taxLoc = {
            area: {}
        };

        $scope.removeIfEmpty = function(agency) {

            if (agency.data.contactInfo) {

                if (agency.data.contactInfo.hasOwnProperty('fax') && agency.data.contactInfo.fax.length === 0) {
                    delete agency.data.contactInfo.fax;
                }

                if (agency.data.contactInfo.hasOwnProperty('primaryEmail') && agency.data.contactInfo.primaryEmail.length === 0) {
                    delete agency.data.contactInfo.primaryEmail;
                }

                if (agency.data.contactInfo.hasOwnProperty('primaryPhone') && agency.data.contactInfo.primaryPhone.length === 0) {
                    delete agency.data.contactInfo.primaryPhone;
                }
            }
        }

        $scope.setLocationData = function(taxLocation) {

            if ($scope.taxLoc.area.hasOwnProperty('type') && $scope.taxLoc.area.type === 'STATE') {
                delete taxLocation.data.city;
                delete taxLocation.data.country;
                delete taxLocation.data.zipCodes;
            }

            if ($scope.taxLoc.area.hasOwnProperty('type') && $scope.taxLoc.area.type === 'CITY') {
                delete taxLocation.data.state;
                delete taxLocation.data.country;
                delete taxLocation.data.zipCodes;
            }

            if ($scope.taxLoc.area.hasOwnProperty('type') && $scope.taxLoc.area.type === 'COUNTRY') {
                delete taxLocation.data.city;
                delete taxLocation.data.zipCodes;
                delete taxLocation.data.state;
            }

            if ($scope.taxLoc.area.hasOwnProperty('type') && $scope.taxLoc.area.type === 'ZIPCODES') {

                taxLocation.data.zipCodes = [];
                angular.forEach($scope.taxLoc.zipCodes, function(zipCode) {
                    taxLocation.data.zipCodes.push(zipCode.text);
                });

                delete taxLocation.data.city;
                delete taxLocation.data.country;
                delete taxLocation.data.state;
            }
        }

        $scope.setAreaType = function(taxLocation) {

            if (taxLocation.data.hasOwnProperty('state') && taxLocation.data.state.length > 0) {
                $scope.taxLoc.area.type = 'STATE';
            } else if (taxLocation.data.hasOwnProperty('city') && taxLocation.data.city.length > 0) {
                $scope.taxLoc.area.type = 'CITY';
            } else if (taxLocation.data.hasOwnProperty('country') && taxLocation.data.country.length > 0) {
                $scope.taxLoc.area.type = 'COUNTRY';
            } else if (taxLocation.data.hasOwnProperty('zipCodes') && taxLocation.data.zipCodes.length > 0) {
                $scope.taxLoc.area.type = 'ZIPCODES';
            }

        }

        // Tax Codes criteria


    }])


})();
