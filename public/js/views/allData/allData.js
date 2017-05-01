var app = angular.module("app.allData", ["ngRoute", "requestModule", "usersModule"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/allData", {
        templateUrl: "/js/views/allData/allData.tpl.html",
        controller: "allDataCtrl"
    })
})

app.controller("allDataCtrl", function ($scope, requestService, usersService) {
    $scope.loadData = function () {
        requestService.getData().then(function (response) {
            $scope.list = response.data.data;
            $scope.list.map(function (item) {
                item.isEdit = false;
                item.dob = new Date(item.dob);
                return item;
            })
        }, function (response) {
            console.log(response.status);
        })
    }

    $scope.deleteItem = function (id, item) {
        usersService.updateStatus(item.userId, "notAccepted").then(function (response) {
            requestService.deleteData(id).then(function () {
                $scope.loadData();
            })
        })
    }

    $scope.edit = function (index) {
        $scope.list[index].edit = !$scope.list[index].edit;
    }

    $scope.save = function (index, data, id) {
        $scope.list[index].edit = !$scope.list[index].edit;
        requestService.updateData(id, data).then(function () {
            $scope.loadData();
        })
    }
})