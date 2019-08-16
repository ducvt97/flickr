'use strict'

// import { isNullOrUndefined } from "util";


angular.
    module('justifiedGallery')
        .controller('JustifiedGalleryController', JustifiedGalleryController)
        .controller('ImageViewController', ImageViewController);

function JustifiedGalleryController ($mdPanel, GetImageList, CreateImageUrl, $scope){
    $scope._mdPanel = $mdPanel;
    $scope.images = [];

    $scope.mainImage;
    $scope.panelRef;

    loadMoreImages();

    function loadMoreImages(){
        let imgDetail = [];
        GetImageList.query(function(response){
            imgDetail = response.photos.photo;
            let i = $scope.images.length;

            for (var index in imgDetail){
                let img = {
                    'index': i + 1,
                    'id': imgDetail[index].id,
                    'src': CreateImageUrl.get(imgDetail[index]),
                    'title': imgDetail[index].title,
                    'span': {
                        'row': 1,
                        'col': 1
                    }
                }

                if (i == 1 || i % 12 == 0 || i % 5 == 0){
                    img.span.col = img.span.row = 2;
                }else if (i % 4 == 0){
                    img.span.col = 2;
                }

                $scope.images.push(img);
                i++;
            }
        });
    }

    $scope.loadMoreImages = function(){
        loadMoreImages();
    }
    
    $scope.showImageView = function($event, data){
        var position = $scope._mdPanel.newPanelPosition()
          .absolute()
          .center();
    
        var config = {
            attachTo: angular.element(document.body),
            controller: 'ImageViewController',
            locals: {
                param: data
            },
            disableParentScroll: true,
            templateUrl: 'justified-gallery/image-view.template.html',
            hasBackdrop: true,
            panelClass: '',
            position: position,
            trapFocus: true,
            zIndex: 150,
            clickOutsideToClose: false,
            escapeToClose: true,
            focusOnOpen: true
        };

        $scope._mdPanel.open(config);
    }
}

function ImageViewController($scope, $document, mdPanelRef, GetImageInfo, param){
    $scope.mainImage = angular.copy(param.image);
    $scope.images = angular.copy(param.images);
    $scope._mdPanelRef = mdPanelRef;
    $scope.imageInfo;
    $scope.searchList;

    setImageInfo();

    function setImageInfo(){
        GetImageInfo.get($scope.mainImage.id).query(function(response){
            $scope.imageInfo = response.photo;
        });
    }

    $scope.closeImageView = function(){
        if ($scope._mdPanelRef) {
            $scope._mdPanelRef.close();
        }
    };
    
    $scope.showPreviousImage = function(){
        let prevIndex = $scope.mainImage.index - 2;
        if($scope.images[prevIndex] != null && $scope.images[prevIndex] != undefined){
            $scope.mainImage = $scope.images[prevIndex];
            setImageInfo();
            // var nextBtn = angular.element(document).find('#nextImgBtn');
            // nextBtn.removeClass('animate-show-hide');
            let queryResult = $document[0].getElementById('nextImgBtn')
            let nextBtn = angular.element(queryResult);
            nextBtn.removeClass('animate-show-hide');
        }
        if($scope.images[prevIndex - 1] == null || $scope.images[prevIndex - 1] == undefined){
            let queryResult = $document[0].getElementById('prevImgBtn')
            let prevBtn = angular.element(queryResult);
            prevBtn.addClass('animate-show-hide');
            // var prevBtn = angular.element(document).find('#prevImgBtn');
            // prevBtn.addClass('animate-show-hide');
        }
    };
    
    $scope.showNextImage = function(){
        let nextIndex = $scope.mainImage.index;
        if($scope.images[nextIndex] != null && $scope.images[nextIndex] != undefined){
            $scope.mainImage = $scope.images[nextIndex];
            setImageInfo();
            // var prevBtn = angular.element(document).find('#prevImgBtn');
            // prevBtn.removeClass('animate-show-hide');
            let queryResult = $document[0].getElementById('prevImgBtn')
            let prevBtn = angular.element(queryResult);
            prevBtn.removeClass('animate-show-hide');
        }
        if($scope.images[nextIndex + 1] == null || $scope.images[nextIndex + 1] == undefined){
            // var nextBtn = angular.element(document).find('#nextImgBtn');
            // nextBtn.addClass('animate-show-hide');
            let queryResult = $document[0].getElementById('nextImgBtn')
            let nextBtn = angular.element(queryResult);
            nextBtn.addClass('animate-show-hide');
        }
    };
}
