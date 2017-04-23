var app = angular.module("usernameModule", []);

app.service("usernameService", function () {
    
    this.setUsername = function (id) {
        localStorage["username"] = id;
    };
    
    this.getUsername = function () {
        return localStorage["username"];
    };
    
    this.removeUsername = function () {
        localStorage.removeItem("username");
    };
    
});