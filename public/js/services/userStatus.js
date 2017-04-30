var app = angular.module("statusModule", []);

app.service("statusService", function () {
    
    this.setStatus = function (status) {
        localStorage["status"] = status;
    };
    
    this.getStatus = function () {
        return localStorage["status"];
    };
    
    this.removeStatus = function () {
        localStorage.removeItem("status");
    };
    
});