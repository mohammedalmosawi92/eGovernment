var app = angular.module("app.oneUser", ["ngRoute", "requestModule", "usersModule", "tempModule"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/oneUser/:id", {
        templateUrl: "/js/views/oneUser/oneUser.tpl.html",
        controller: "oneUserCtrl"
    })
})

app.controller("oneUserCtrl", function ($scope, requestService, usersService, $routeParams, tempService) {
    var userId = $routeParams.id;
    $scope.loadData = function () {
        requestService.getDataByUserId(userId).then(function (response) {
            if (response.data.data) {
                $scope.item = response.data.data;
            } else {
                tempService.getDataByUserId(userId).then(function (response) {
                    $scope.item = response.data.data;
                })
            }
        }, function (response) {
            console.log("no data");
        })
    }
})