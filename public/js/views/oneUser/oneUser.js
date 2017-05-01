var app = angular.module("app.oneUser", ["ngRoute", "requestModule", "usersModule", "tempModule"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/oneUser/:id", {
        templateUrl: "/js/views/oneUser/oneUser.tpl.html",
        controller: "oneUserCtrl"
    })
})

app.controller("oneUserCtrl", function ($scope, requestService, usersService, $routeParams, tempService) {
    var userId = $routeParams.id;
    $scope.websiteDatabase = false;
    $scope.loadData = function () {
        requestService.getDataByUserId(userId).then(function (response) {
            if (response.data.data) {
                $scope.item = response.data.data;
                $scope.websiteDatabase = true;
                $scope.item.edit = false;
                $scope.item.dob = new Date($scope.item.dob);
            } else {
                tempService.getDataByUserId(userId).then(function (response) {
                    $scope.item = response.data.data;
                    $scope.item.edit = false
                })
            }
        }, function (response) {
            console.log("no data");
        })
        usersService.getUserById(userId).then(function (response) {
            $scope.reqList = response.data.data.requests;
        }, function (response) {
            console.log(response.status);
        })
    }

    $scope.edit = function () {
        $scope.item.edit = !$scope.item.edit;
    }

    $scope.saveToDB = function (id, item) {
        $scope.item.edit = !$scope.item.edit;
        requestService.updateData(id, item).then(function() {
            $scope.loadData();
        })
    }

    $scope.saveToTemp = function(id, item) {
        $scope.item.edit = !$scope.item.edit;
        tempService.updateData(id, item).then(function() {
            $scope.loadData();
        })
    }
})