var app = angular.module("app.personInfo", ["ngRoute", "tempModule","idModule", "idNumberModule", "tokenModule", "privModule", "usernameModule", "statusModule"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/personInfo", {
        templateUrl: "/js/views/personInfo/personInfo.tpl.html",
        controller: "personInfoCtrl"
    })
})

app.controller("personInfoCtrl", function ($scope, tempService, $location, idService, idNumberService, tokenService, privService, usernameService, statusService) {
    
    $scope.personInfo = {};
    $scope.personInfo.dob = new Date();
    $scope.personInfo.username = usernameService.getUsername();
    $scope.personInfo.idNumber = Number(idNumberService.getId());
    $scope.personInfo.status = "اعزب";
    $scope.personInfo.sex = "ذكر";
    $scope.submit = function () {
        tempService.postData($scope.personInfo).then(function (response) {
            $location.path("/signIn");
        }, function (response) {
            console.log(response.status);
        });
    }
});