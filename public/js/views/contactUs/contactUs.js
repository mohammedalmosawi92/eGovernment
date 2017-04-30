var app = angular.module("app.contactUs", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider.when("/contactUs", {
        templateUrl: "/js/views/contactUs/contactUs.tpl.html",
        controller: "contactUsCtrl"
    })
})

app.controller("contactUsCtrl", function($scope) {
    
});