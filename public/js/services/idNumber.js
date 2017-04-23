var app = angular.module("idNumberModule", []);

app.service("idNumberService", function () {
    
    this.setId = function (id) {
        localStorage['idNumber'] = id;
    };
    
    this.getId = function () {
        return localStorage["idNumber"];
    };
    
    this.removeId = function () {
        localStorage.removeItem('idNumber');
    };
    
});