var app = angular.module("usernameModule", []);

app.service("usernameService", function () {
    
    this.setUsername = function (username) {
        localStorage["username"] = username;
    };
    
    this.getUsername = function () {
        return localStorage["username"];
    };
    
    this.removeUsername = function () {
        localStorage.removeItem("username");
    };
    
});