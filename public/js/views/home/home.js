var app = angular.module("app.home", ["ngRoute","privModule"]);
app.config(function($routeProvider) {
    $routeProvider.when("/home", {
        templateUrl: "/js/views/home/home.tpl.html",
        controller: "homeCtrl"
    })
})



app.controller("homeCtrl", function($scope,privService) {
    $scope.privilege = function(){
        return privService.getPriv()
    }
})