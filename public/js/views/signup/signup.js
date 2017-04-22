var app = angular.module("app.signup", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider.when("/signup", {
        templateUrl: "/js/views/signup/signup.tpl.html",
        controller: "signupCtrl"
    })
})

app.controller("signupCtrl", function($scope) {
    $scope.gender = "Male"
})