var app = angular.module("requestModule", []);

app.service("requestService", function($http) {
    this.getData = function() {
        return $http.get("http://localhost:8080/personal/");
    }
    
    this.getDataByUserId = function(userId) {
        return $http.get("http://localhost:8080/personal/" + userId);
    }
    
    this.postData = function(data) {
        return $http.post("http://localhost:8080/personal/", data);
    }
    
    this.deleteData = function(id) {
        return $http.delete("http://localhost:8080/personal/" + id);
    }
    
    this.updateData = function(id, data) {
        var query = "?";
        for(key in data) {
            query += key + "=" + data[key] + "&"
        }
        return $http.put("http://localhost:8080/personal/" + id + query);
    }
    
})