'use strict'

angular.module('mainHeader').controller('SearchPhotoController', searchPhotoController);

function searchPhotoController($scope, $state){
    $scope.result;

    $scope.search = function($event, searchKey){
        if($event.keyCode == 13){
            $state.go('search', {searchKey: searchKey})
        }
    }
}