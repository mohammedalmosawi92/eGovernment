var app = angular.module("authModule", []);

app.service("authService", function($http) {
    this.signUp = function(data) {
        return $http.post("http://localhost:8080/signup/", data);
    }
    
    this.signIn = function(data) {
        return $http.post("http://localhost:8080/signin/", data);
    }
})