'use strict'

var justifiedLayout = require('justified-layout');


angular.
    module('justifiedGallery')
        .controller('JustifiedGalleryController', JustifiedGalleryController)
        .controller('ImageViewController', ImageViewController);

function JustifiedGalleryController ($mdPanel, GetImageList, CreateImageUrl, GetImageInfo, GetImageSize, $scope){
    $scope._mdPanel = $mdPanel;
    $scope.images = [];

    $scope.mainImage;
    $scope.panelRef;

    var sizeConfig = {sizes:[],className:"various", config:{}};

    loadMoreImages();

    function delay() {
        return new Promise(resolve => setTimeout(resolve, 400));
    }

    async function createNewImageObject(item, i) {
        
        await delay();
        
        let img = {
            'id': item.id,
            'index': i,
            'src': CreateImageUrl.get(item),
            'detail': {},
            'layout': {}
        }
        
        GetImageSize.get(item.id).query(function(response){
            let sizeResponse = response.sizes.size[3];
            sizeConfig.sizes.push(
                sizeResponse.width/
                sizeResponse.height
            );
            console.log(sizeResponse);
        });

        // GetImageInfo.get(item.id).query(function(response){
        //     img.detail = response.photo;
        // });
        
        return img;
        
    }

    async function loadMoreImages(){
        let imgDetail = [];
        let imageList = [];

        sizeConfig = {sizes:[],className:"various", config:{}};
        
        GetImageList.query(async function(response){
            imgDetail = response.photos.photo;
            
            let i = $scope.images.length;
            for (const item of imgDetail) {
                let img = await createNewImageObject(item, i);
                imageList.push(img);
                i++;
            }

            // for (let index in imgDetail){
            //     let img = {
            //         'index': i,
            //         'src': CreateImageUrl.get(imgDetail[index]),
            //         'detail': {},
            //         'layout': {}
            //     }
                
                
            //     GetImageSize.get(imgDetail[index].id).query(function(response){
            //         let sizeResponse = response.sizes.size[3];
            //         sizeConfig.sizes.push(
            //             sizeResponse.width/
            //             sizeResponse.height
            //         );
            //     });

            //     GetImageInfo.get(imgDetail[index].id).query(function(response){
            //         img.detail = response.photo;
            //     });
            //     //console.log(img);
            //     imageList.push(img);
            //     i++;
                
            // }
            
            let layout = justifiedLayout(sizeConfig.sizes, sizeConfig.config);
            console.log(layout);
            for (let index in imageList){
                imageList[index].layout = layout.boxes[index];
                //console.log($scope.images);
            }
            $scope.images = $scope.images.concat(imageList);
            console.log($scope.images);
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
            clickOutsideToClose: true,
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
