var app = angular.module("authModule", ["tokenModule"]);

app.service("authService", function($http, tokenService) {
    this.signup = function(data) {
        return $http.post("http://localhost:8080/signup/", data);
    }
    
    this.signin = function(data) {
        return $http.post("http://localhost:8080/signin/", data);
    }
    
    this.isAuthenticated = function () {
        return !!tokenService.getToken();
    };
})