var app = angular.module("app.kayd", ["ngRoute", "requestModule", "idModule"]);
app.config(function ($routeProvider) {
    $routeProvider.when("/kayd", {
        templateUrl: "/js/views/kayd/kayd.tpl.html",
        controller: "kaydCtrl"
    })
})


app.controller("kaydCtrl", function ($scope, requestService, idService) {
    var userId = idService.getId();
    $scope.loadData = function () {
        requestService.getDataByUserId(userId).then(function (response) {
            $scope.item = response.data.data;
            console.log($scope.item);
        }, function (response) {
            console.log(response.status);
        })
    }
})