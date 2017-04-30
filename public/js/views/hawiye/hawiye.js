var app = angular.module("app.hawiye", ["ngRoute", "requestModule", "idNumberModule"]);
app.config(function ($routeProvider) {
    $routeProvider.when("/hawiye", {
        templateUrl: "/js/views/hawiye/hawiye.tpl.html",
        controller: "hawiyeCtrl"
    })
})

app.controller("hawiyeCtrl", function ($scope, requestService, idNumberService) {
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