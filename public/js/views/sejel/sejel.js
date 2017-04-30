var app = angular.module("app.sejel", ["ngRoute", "requestModule", "idNumberModule"]);
app.config(function ($routeProvider) {
    $routeProvider.when("/sejel", {
        templateUrl: "/js/views/sejel/sejel.tpl.html",
        controller: "sejelCtrl"
    })
})

app.controller("sejelCtrl", function ($scope, requestService, idNumberService) {
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