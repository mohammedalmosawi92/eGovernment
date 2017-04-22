var app = angular.module("app.personInfo", ["ngRoute", "tempModule"]);


app.config(function ($routeProvider) {
    $routeProvider.when("/personInfo", {
        templateUrl: "/js/views/personInfo/personInfo.tpl.html",
        controller: "personInfoCtrl"
    })
})

app.controller("personInfoCtrl", function ($scope, tempService, $location) {
    $scope.personInfo = {};
    $scope.personInfo.status = "single";
    $scope.personInfo.sex = "male";
    $scope.submit = function () {
        console.log($scope.personInfo)
        tempService.postData($scope.personInfo).then(function (response) {
            $location.path("/signIn");
        }, function (response) {
            console.log(response.status);
        });
    }
});