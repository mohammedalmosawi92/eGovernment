var app = angular.module("usersModule", []);

app.service("usersService", function($http) {
    this.getUsers = function() {
        return $http.get("http://localhost:8080/users/");
    }
    
    this.getUserById = function(id) {
        return $http.get("http://localhost:8080/users/" + id);
    }
    
    this.postRequestType = function(data) {
        return $http.post("http://localhost:8080/users/", data);
    }
    
    this.deleteUser = function(id) {
        return $http.delete("http://localhost:8080/users/" + id);
    }
    
    this.updateUser = function(id, data) {
        var query = "?";
        for(key in data) {
            query += key + "=" + data[key] + "&"
        }
        return $http.put("http://localhost:8080/users/" + id + query);
    }
    
})