var app = angular.module("app.hawiye", ["ngRoute", "requestModule", "idModule"]);
app.config(function ($routeProvider) {
    $routeProvider.when("/hawiye", {
        templateUrl: "/js/views/hawiye/hawiye.tpl.html",
        controller: "hawiyeCtrl"
    })
})

app.controller("hawiyeCtrl", function ($scope, requestService, idService) {
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