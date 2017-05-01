var app = angular.module("app.change", ["ngRoute", "changeModule", "requestModule"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/change", {
        templateUrl: "/js/views/change/change.tpl.html",
        controller: "changeCtrl"
    })
})

app.controller("changeCtrl", function ($scope, changeService, requestService) {
    
    $scope.loadData = function () {
        changeService.getData().then(function (response) {
            $scope.list = response.data.data;
        }, function (response) {
            console.log(response.data);
        })
    }

    $scope.deleteChange = function (_id) {
        changeService.deleteData(_id).then(function (response) {
            $scope.loadData();
        }, function (response) {
            console.log(response.status);
        })
    }

    $scope.accept = function (userId, changeArr, _id) {
        var updateInfo = {};

        for (var i = 0; i < changeArr.length; i++) {
            updateInfo[changeArr[i].type.split(",")[1]] = changeArr[i].value;
        }

        requestService.changeData(userId, updateInfo).then(function (response) {
            changeService.deleteData(_id).then(function (response) {
                $scope.loadData();
            }, function (response) {
                console.log(response.status);
            })
        }, function (response) {
            console.log(response.status);
        })

    }
})