'use strict'

angular.module('mainHeader').controller('SearchPhotoController', searchPhotoController);

function searchPhotoController($scope, SearchPhoto){
    $scope.result;

    $scope.search = function($event, searchKey){
        console.log($event.keyCode);
        console.log(searchKey);
        if($event.keyCode == 13){
            SearchPhoto.get(searchKey).query(function(response){
                $scope.result = response;
                console.log($scope.result);
            })
        }
    }
}