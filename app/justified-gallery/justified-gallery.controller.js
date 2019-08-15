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

    let imgDetail = [];
    GetImageList.query(function(response){
        imgDetail = response.photos.photo;
        
        let i = $scope.images.length;
        for (var index in imgDetail){
            let img = {
                'index': i + 1,
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
            //self.images.length
            $scope.images.push(img);
            i++;
        }
    });
    
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
            clickOutsideToClose: true,
            escapeToClose: true,
            focusOnOpen: true
        };

        $scope._mdPanel.open(config)
            .then(function(result) {
                console.log(data.image);
                $scope.panelRef = result;
                $scope.mainImage = data.image;
            });
    }
}

function ImageViewController($scope, mdPanelRef, param){
    $scope.mainImage = angular.copy(param.image);
    $scope.images = angular.copy(param.images);
    $scope._mdPanelRef = mdPanelRef;

    $scope.closeImageView = function(){
        if ($scope._mdPanelRef) {
            $scope._mdPanelRef.close();
        }
    };
    
    $scope.showPreviousImage = function(){
        let nextIndex = this.mainImage.index - 1;
        if(this.images[nextIndex] != null && this.images[nextIndex] != undefined){
            this.mainImage = this.images[nextIndex];
        }
        if(this.images[nextIndex - 1] == null || this.images[nextIndex - 1] == undefined){
            //this.mainImage = this.images[nextIndex];
        }
    };
    
    $scope.showNextImage = function(){
        let nextIndex = this.mainImage.index + 1;
        if(this.images[nextIndex] != null && this.images[nextIndex] != undefined){
            this.mainImage = this.images[nextIndex];
        }
        if(this.images[nextIndex + 1] == null || this.images[nextIndex + 1] == undefined){
            //this.mainImage = this.images[nextIndex];
        }
    };
}
