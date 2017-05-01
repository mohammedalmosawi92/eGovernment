var app = angular.module("app.sejel", ["ngRoute", "requestModule", "idModule"]);
app.config(function ($routeProvider) {
    $routeProvider.when("/sejel", {
        templateUrl: "/js/views/sejel/sejel.tpl.html",
        controller: "sejelCtrl"
    })
})

app.controller("sejelCtrl", function ($scope, requestService, idService) {
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