'use strict'

var justifiedLayout = require('justified-layout');


angular.
    module('imageView')
        .controller('ImageViewController', ImageViewController);

function ImageViewController($scope, $document, mdPanelRef, GetImageInfo, param){
    $scope.mainImage = angular.copy(param.image);
    $scope.images = angular.copy(param.images);
    $scope._mdPanelRef = mdPanelRef;

    setImageInfo();

    function setImageInfo(){
        GetImageInfo.get($scope.mainImage.id).query(function(response){
            $scope.mainImage.detail = response.photo;
        });
    }

    $scope.closeImageView = function(){
        if ($scope._mdPanelRef) {
            $scope._mdPanelRef.close();
        }
    };
    
    $scope.showPreviousImage = function(){
        let prevIndex = $scope.mainImage.index - 1;
        if($scope.images[prevIndex] != null && $scope.images[prevIndex] != undefined){
            $scope.mainImage = $scope.images[prevIndex];
            setImageInfo();
            
            let queryResult = $document[0].getElementById('nextImgBtn')
            let nextBtn = angular.element(queryResult);
            nextBtn.removeClass('hidden-element');
        }
        if($scope.images[prevIndex - 1] == null || $scope.images[prevIndex - 1] == undefined){
            let queryResult = $document[0].getElementById('prevImgBtn');
            let prevBtn = angular.element(queryResult);
            prevBtn.addClass('hidden-element');
        }
    };
    
    $scope.showNextImage = function(){
        let nextIndex = $scope.mainImage.index + 1;
        if($scope.images[nextIndex] != null && $scope.images[nextIndex] != undefined){
            $scope.mainImage = $scope.images[nextIndex];
            setImageInfo();
            
            let queryResult = $document[0].getElementById('prevImgBtn')
            let prevBtn = angular.element(queryResult);
            prevBtn.removeClass('hidden-element');
        }
        if($scope.images[nextIndex + 1] == null || $scope.images[nextIndex + 1] == undefined){
            let queryResult = $document[0].getElementById('nextImgBtn')
            let nextBtn = angular.element(queryResult);
            nextBtn.addClass('hidden-element');
        }
    };
}