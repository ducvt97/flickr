'use strict'

angular
    .module('user')
    .controller('UserController', UserController);

function UserController(GetUserInfo, $scope, $stateParams){
    $scope.userInfo;

    GetUserInfo.get($stateParams.user_id).query(function(response){
        $scope.userInfo = response.person;
    });
}