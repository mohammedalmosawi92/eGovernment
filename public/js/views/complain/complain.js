var app = angular.module("app.complain", ["ngRoute", "complainsModule"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/complain", {
        templateUrl: "/js/views/complain/complain.tpl.html",
        controller: "complainCtrl"
    })
})

app.controller("complainCtrl", function($scope, complainsService) {
    $scope.loadData = function() {
        complainsService.getData().then(function(response) {
            $scope.list = response.data.data;
        }, function(response) {
            console.log(response.status)
        })
    }
    
    $scope.deleteComplain = function(id) {
        complainsService.deleteData(id).then(function() {
            $scope.loadData();
        }, function(response) {
            console.log(response.status);
        })
    }
})