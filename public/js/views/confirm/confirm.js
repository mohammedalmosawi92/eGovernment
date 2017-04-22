var app = angular.module("app.confirm", ["ngRoute", "tempModule", "requestModule"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/confirm", {
        templateUrl: "/js/views/confirm/confirm.tpl.html",
        controller: "confirmCtrl"
    })
})

app.controller("confirmCtrl", function ($scope, tempService, requestService) {
    $scope.loadData = function () {
        tempService.getData().then(function (response) {
            $scope.list = response.data.data;
        }, function (response) {
            console.log(response.status);
        })
    }
    
    $scope.confirmData = function(item) {
        requestService.postData(item).then(function(response) {
           tempService.deleteData(item._id).then(function() {
               $scope.loadData()
           }, function(response) {
               console.log(response.status);
           })
        }, function(response) {
            console.log("This person already exists in the database ", response.status)
        })
    }
    
    $scope.deleteItem = function(id) {
        tempService.deleteData(id).then(function() {
            $scope.loadData()
        })
    }
})