var app = angular.module("app.signin", ["ngRoute", "authModule", "idModule", "idNumberModule", "tokenModule", "privModule", "usernameModule", "statusModule"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/signin", {
        templateUrl: "/js/views/signin/signin.tpl.html",
        controller: "signinCtrl"
    })
})

app.controller("signinCtrl", function ($scope, authService, $location, idService, idNumberService, tokenService, privService, usernameService, statusService) {
    $scope.user = {};
    $scope.signin = function () {
        authService.signin($scope.user).then(function (response) {
            idService.setId(response.data.id);
            idNumberService.setId(response.data.idNumber);
            tokenService.setToken(response.data.token);
            privService.setPriv(response.data.privilege);
            usernameService.setUsername(response.data.username);
            statusService.setStatus(response.data.status);
            $scope.user = {};
            $('#sign-modal').modal('show');
            $location.path("/home");
            setTimeout(function() {
                $('#sign-modal').modal('hide');
            }, 3000)
        }, function (response) {
            alert("This username does not exists");
        })
    }
})
