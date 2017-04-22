var app = angular.module("tempModule", []);

app.service("tempService", function($http) {
    this.getData = function() {
        return $http.get("http://localhost:8080/temp/");
    }
    
    this.getDataById = function(id) {
        return $http.get("http://localhost:8080/temp/" + id);
    }
    
    this.postData = function(data) {
        return $http.post("http://localhost:8080/temp/", data);
    }
    
    this.deleteData = function(id) {
        return $http.delete("http://localhost:8080/temp/" + id);
    }
    
    this.updateData = function(id, data) {
        var query = "?";
        for(key in data) {
            query += key + "=" + data[key] + "&"
        }
        return $http.put("http://localhost:8080/temp/" + id + query);
    }
    
})