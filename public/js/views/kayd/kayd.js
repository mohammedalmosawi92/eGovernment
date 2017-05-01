var app = angular.module("app.kayd", ["ngRoute", "requestModule", "idModule", "usersModule"]);
app.config(function ($routeProvider) {
    $routeProvider.when("/kayd", {
        templateUrl: "/js/views/kayd/kayd.tpl.html",
        controller: "kaydCtrl"
    })
})


app.controller("kaydCtrl", function ($scope, requestService, idService, usersService) {
    var userId = idService.getId();
    $scope.loadData = function () {
        requestService.getDataByUserId(userId).then(function (response) {
            $scope.item = response.data.data;
            console.log($scope.item);
        }, function (response) {
            console.log(response.status);
        })
    }
    
    $scope.send = function(item) {
        var data = {}
        for(key in item) {
            data[key] = item[key]
        }
        data.type = "kayad"
        data.date = new Date();
        usersService.postRequestType(userId, data).then(function(response) {
            
        }, function(response) {
            console.log(response.status);
        })
    }
})