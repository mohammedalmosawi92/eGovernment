var app = angular.module("complainsModule", []);

app.service("complainsService", function($http) {
    this.getData = function() {
        return $http.get("http://localhost:8080/complain/");
    }
    
    this.getDataById = function(id) {
        return $http.get("http://localhost:8080/complain/" + id);
    }
    
    this.postData = function(data) {
        return $http.post("http://localhost:8080/complain/", data);
    }
    
    this.deleteData = function(id) {
        return $http.delete("http://localhost:8080/complain/" + id);
    }
})