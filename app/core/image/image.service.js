'use strict'

angular.module('core.image')
    .constant('FLICKR', {
            api_key: "0e7ed22067a7a4464503bb479d830527",
            user_id: "c97f1605d22916fc"
        }
    );

angular.
    module('core.image')
    .factory('GetImageList', ['$resource', 'FLICKR', getImageList])
    .factory('GetImageInfo', ['$resource', 'FLICKR', getImageInfo])
    .factory('SearchPhoto', ['$resource', 'FLICKR', searchPhoto])
    .factory('CreateImageUrl', [createImgURL]);


function getImageList($resource, FLICKR){
    return $resource(`https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${FLICKR.api_key}&format=json&nojsoncallback=1&per_page=20&page=0`,
    {}, {
        query:{
            method: 'GET',
            isArray: false
        }
    });
}

function getImageInfo($resource, FLICKR){
    return {
        get: function(photoID){
            return $resource(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${FLICKR.api_key}&photo_id=${photoID}&format=json&nojsoncallback=1`,
            {}, {
                query:{
                    method: 'GET',
                    isArray: false
                }
            });
        }
    }
}

function searchPhoto($resource, FLICKR){
    return {
        get: function(searchKey){
            return $resource(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR.api_key}&text=${searchKey}&format=json&nojsoncallback=1&per_page=20&page=0`,
            {}, {
                query:{
                    method: 'GET',
                    isArray: false
                }
            });
        }
    }
    
}

function createImgURL() {
    return {
        get : function(item){
            return `http://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`;
        }
    };
}