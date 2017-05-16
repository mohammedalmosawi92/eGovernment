var app = angular.module("app.userReq", ["ngRoute", "idModule", "userReqModule"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/userReq", {
        templateUrl: "/js/views/userReq/userReq.tpl.html",
        controller: "userReqCtrl"
    })
});

app.controller("userReqCtrl", function ($scope, idService, userReqService) {
    var userId = idService.getId();
    $scope.loadData = function () {
        userReqService.getData().then(function (response) {
            $scope.list = response.data.data;
        }, function (response) {
            console.log(response.status);
        })
    }
    $scope.delReq = function (id) {
        userReqService.deleteData(id).then(function (response) {
            $scope.loadData()
        })
    }
})