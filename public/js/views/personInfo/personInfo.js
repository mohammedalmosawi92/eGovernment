var app = angular.module("app.personInfo", ["ngRoute", "tempModule","idModule", "idNumberModule", "tokenModule", "privModule", "usernameModule"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/personInfo", {
        templateUrl: "/js/views/personInfo/personInfo.tpl.html",
        controller: "personInfoCtrl"
    })
})

app.controller("personInfoCtrl", function ($scope, tempService, $location, idService, idNumberService, tokenService, privService, usernameService) {
    $scope.personInfo = {};
    $scope.personInfo.dob = new Date();
    $scope.personInfo.username = usernameService.getUsername();
    $scope.personInfo.idNumber = Number(idNumberService.getId());
    $scope.personInfo.status = "single";
    $scope.personInfo.sex = "male";
    console.log($scope.personInfo);
    $scope.submit = function () {
        console.log($scope.personInfo)
        tempService.postData($scope.personInfo).then(function (response) {
            $location.path("/signIn");
        }, function (response) {
            console.log(response.status);
        });
    }
});