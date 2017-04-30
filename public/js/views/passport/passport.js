var app = angular.module("app.passport", ["ngRoute", "requestModule", "idNumberModule"]);
app.config(function ($routeProvider) {
    $routeProvider.when("/passport", {
        templateUrl: "/js/views/passport/passport.tpl.html",
        controller: "passportCtrl"
    })
})

app.controller("passportCtrl", function ($scope, requestService, idNumberService) {
    var idNumber = idNumberService.getId();
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