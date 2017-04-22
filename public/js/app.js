var app = angular.module("app", ["ngRoute", "app.home", "app.personInfo", "app.confirm", "app.signup"]);

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider.when("/", {
        redirectTo: "/home"
    }).otherwise({
        redirectTo: "/home"
    })
})

app.controller("ctrl", function($scope) {
    $scope.msg = "Hello World";
})