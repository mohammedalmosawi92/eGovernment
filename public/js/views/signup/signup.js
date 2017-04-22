var app = angular.module("app.signup", ["ngRoute", "tempModule"]);


app.config(function ($routeProvider) {
    $routeProvider.when("/signup", {
        templateUrl: "/js/views/signup/signup.tpl.html",
        controller: "signupCtrl"
    })
})

app.controller("signupCtrl", function($scope) {
    
})