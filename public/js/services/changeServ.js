var app = angular.module("changeModule", []);

app.service("changeService", function($http) {
    this.getData = function() {
        return $http.get("http://localhost:8080/change/");
    }
    
    this.getDataById = function(id) {
        return $http.get("http://localhost:8080/change/" + id);
    }
    
    this.postData = function(data) {
        return $http.post("http://localhost:8080/change/", data);
    }
    
    this.deleteData = function(id) {
        return $http.delete("http://localhost:8080/change/" + id);
    }
})