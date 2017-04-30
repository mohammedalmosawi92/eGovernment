var app = angular.module("app.contactUs", ["ngRoute", "complainsModule", "idModule", "usernameModule"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/contactUs", {
        templateUrl: "/js/views/contactUs/contactUs.tpl.html",
        controller: "contactUsCtrl"
    })
})

app.controller("contactUsCtrl", function ($scope, complainsService, idService, usernameService) {
    var id = idService.getId();
    var username = usernameService.getUsername();
    $scope.send = function () {
        var data = {
            userId: id,
            complain: $scope.complain,
            username: username
        };
        complainsService.postData(data).then(function (response) {
            $scope.success = true;
            $scope.fail = false;
        }, function (response) {
            $scope.success = false;
            $scope.fail = true;
            console.log(response.status);
        })
    }

});