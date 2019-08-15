(function(){
    'use strict'

function createImgURL(item) {
    return 'http://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '.jpg';
}

angular.
    module('explore').
    component('explore', {
        templateUrl: 'explore/explore.template.html',
        controller: function(Image, $scope, $mdPanel) {
            $scope._mdPanel = $mdPanel;
            $scope.images = [];
            $scope._mdPanelRef;
            $scope.imgIndex;
            $scope.mainImage;

            let imgDetail = [];
            Image.query(function(response){
                imgDetail = response.photos.photo;
                
                let i = 1;
                for (var index in imgDetail){
                    let img = {
                        'index': index,
                        'src': createImgURL(imgDetail[index]),
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

            $scope.showImageView = function($event, data){
                var position = this._mdPanel.newPanelPosition()
                  .absolute()
                  .center();
            
                var config = {
                    attachTo: angular.element(document.body),
                    //controller: $scope.ImageViewController,
                    //controllerAs: 'ctrl',
                    local: data,
                    disableParentScroll: this.disableParentScroll,
                    templateUrl: 'justified-gallery/image-view.template.html',
                    hasBackdrop: true,
                    panelClass: '',
                    position: position,
                    trapFocus: true,
                    zIndex: 150,
                    clickOutsideToClose: true,
                    escapeToClose: true,
                    focusOnOpen: true
                }
                $scope._mdPanel.open(config).then(function(result){
                    $scope._mdPanelRef = result;
                });
            }
            
            $scope.closeImageView = function(){
                if ($scope._mdPanelRef) $scope._mdPanelRef.close();
            }
        }

            // $scope.images = [];
            // let imgDetail = [];
            // Image.query(function(response){
            //     imgDetail = response.photos.photo;
                
            //     let i = 1;
            //     for (var index in imgDetail){
            //         let img = {
            //             'src': createImgURL(imgDetail[index]),
            //             'title': imgDetail[index].title,
            //             'span': {
            //                 'row': 1,
            //                 'col': 1
            //             }
            //         }

            //         if (i == 1 || i % 12 == 0 || i % 5 == 0){
            //             img.span.col = img.span.row = 2;
            //         }else if (i % 4 == 0){
            //             img.span.col = 2;
            //         }

            //         $scope.images.push(img);
            //         i++;
            //     }
            // });

            // $scope.images = [];
            // let imgDetail = [];
            // Image.query(function(response){
            //     imgDetail = response.photos.photo;
                
            //     for (var index in imgDetail){
            //         $scope.images.push({
            //             'src': createImgURL(imgDetail[index]),
            //             'name': imgDetail[index].title,
            //         });
            //     }
            // });
        //}


        // controller: ['Image',
        //     function ExploreController(Image){
        //         this.images = [];
        //         let imgDetail = [];
        //         Image.query(function(response){
        //             imgDetail = response.photos.photo;
        //             for (var img in imgDetail){
        //                 this.images.push({
        //                     'src': createImgURL(img),
        //                     'name': img.title,
        //                 });
        //             }
        //         });
                
                
                
        //     }
        // ]
    });
})()