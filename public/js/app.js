var app = angular.module("app", ["ngRoute", "app.home", "app.personInfo", "app.confirm", "app.signup", "authModule", "idModule", "idNumberModule", "tokenModule", "privModule", "usernameModule"]);

app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider.when("/", {
        redirectTo: "/home"
    }).otherwise({
        redirectTo: "/home"
    })
});

app.service("AuthInterceptor", ["$q", "$location", "tokenService", function ($q, $location, tokenService) {
    this.request = function (config) {
        var token = tokenService.getToken();
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    };
    
    //to delete everything from the local storage in cast of an error
    this.responseError = function (response) {
        if (response.status === 401 || response.status === 500) {
            idService.removeId();
            idNumberService.removeId();
            tokenService.removeToken();
            privService.removePriv();
            usernameService.removeUsername(response.data.username);
        }
        return $q.reject(response);
    };
}]);

app.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");
}]);

app.controller("ctrl", function ($scope, authService, $location, idService, idNumberService, tokenService, privService, usernameService) {
    
    //to check if there is a user
    $scope.loginCheck = function () {
        return authService.isAuthenticated();
    };
    
    //to check the priv
    $scope.chechUser = function () {
        return privService.getPriv();
    };
    
    //to set an obj for userInput
    $scope.userInput = {};
    
    //sign in
    $scope.signin = function () {
        $scope.userInput.idNumber = $scope.userInput.password;
        authService.signin($scope.userInput).then(function (response) {
            console.log(response.data);
            idService.setId(response.data.id);
            idNumberService.setId(response.data.idNumber);
            tokenService.setToken(response.data.token);
            privService.setPriv(response.data.privilege);
            usernameService.setUsername(response.data.username);
            $scope.userInput = {};
            $location.path("/");
        }, function (response) {
            alert("This username does not exsits");
        })
    };

    //to delete everything from the local storage after the logout
    $scope.logout = function () {
        idService.removeId();
        idNumberService.removeId();
        tokenService.removeToken();
        privService.removePriv();
        usernameService.removeUsername(response.data.username);
    };
    
})