var app = angular.module("app.passport", ["ngRoute", "requestModule", "idModule", "usersModule"]);
app.config(function ($routeProvider) {
    $routeProvider.when("/passport", {
        templateUrl: "/js/views/passport/passport.tpl.html",
        controller: "passportCtrl"
    })
})

app.controller("passportCtrl", function ($scope, requestService, idService, usersService) {
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
        data.type = "passport"
        data.date = new Date();
        usersService.postRequestType(userId, data).then(function(response) {
            
        }, function(response) {
            console.log(response.status);
        })
    }
})