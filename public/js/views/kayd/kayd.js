var app = angular.module("app.kayd", ["ngRoute", "requestModule", "idNumberModule"]);
app.config(function ($routeProvider) {
    $routeProvider.when("/kayd", {
        templateUrl: "/js/views/kayd/kayd.tpl.html",
        controller: "kaydCtrl"
    })
})


app.controller("kaydCtrl", function ($scope, requestService, idNumberService) {
    var idNumber= idNumberService.getId();
    console.log(idNumber);
    $scope.loadData = function () {
        requestService.getDataByIdNumber(idNumber).then(function (response) {
            $scope.item = response.data.data;
            console.log($scope.item);
        }, function (response) {
            console.log(response.status);
        })
    }
})