var app = angular.module("app.sejel", ["ngRoute", "requestModule", "idModule", "usersModule"]);
app.config(function ($routeProvider) {
    $routeProvider.when("/sejel", {
        templateUrl: "/js/views/sejel/sejel.tpl.html",
        controller: "sejelCtrl"
    })
})

app.controller("sejelCtrl", function ($scope, requestService, idService, usersService) {
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
        data.type = "sejel"
        data.date = new Date();
        usersService.postRequestType(userId, data).then(function(response) {
            
        }, function(response) {
            console.log(response.status);
        })
    }
})