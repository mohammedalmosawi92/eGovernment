var app = angular.module("app.signup", ["ngRoute", "authModule"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/signup", {
        templateUrl: "/js/views/signup/signup.tpl.html",
        controller: "signupCtrl"
    })
})

app.controller("signupCtrl", function($scope, authService, $location) {
    $scope.user = {};
    //$scope.user.privilege = "admin";
    $scope.notMatch = false;
    $scope.signup = function() {
        if($scope.user.password != $scope.user.confirmPassword) {
            $scope.notMatch = true;
        }else {
            $scope.notMatch = false;
            authService.signup($scope.user).then(function() {
                $location.path("/home");
            }, function(response) {
                alert("This username already exists");
            })
        }
    }
})