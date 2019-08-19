'use strict'

angular
    .module('search')
        .controller('SearchController', searchController);

function searchController(SearchPhoto, CreateImageUrl, GetImageSize, $mdPanel, $stateParams, $scope, $q){
    $scope._mdPanel = $mdPanel;
    $scope.images = [];
    $scope.searchKey = $stateParams.searchKey;
    $scope.page = 0;

    $scope.mainImage;
    $scope.panelRef;

    var sizeConfig = {sizes:[],className:"various", config:{}};
    var imageList = [];

    loadMoreImages();

    function createNewImageObject(item, i) { 
        var deferred = $q.defer();     
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

            deferred.resolve();
        });
        
        imageList.push(img);
        return deferred.promise;
    }

    function loadMoreImages(){
        let imgDetail = [];

        sizeConfig = {sizes:[],className:"various", config:{}};
        
        SearchPhoto.get($scope.searchKey, $scope.page).query(function(response){
            imgDetail = response.photos.photo;
            
            let i = $scope.images.length;
            var promises = [];
            for (const item of imgDetail) {
                var promise = createNewImageObject(item, i);
                promises.push(promise);
                i++;
            }

            $q.all(promises).then(function(response){
                let layout = justifiedLayout(sizeConfig.sizes, sizeConfig.config);
                
                for (let index in imageList){
                    imageList[index].layout = layout.boxes[index];
                }
                $scope.images = $scope.images.concat(imageList);
                $scope.page++;
            });
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
            templateUrl: 'image-view/image-view.template.html',
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