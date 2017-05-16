var app = angular.module("userReqModule", []);

app.service("userReqService", function ($http) {
    this.getData = function () {
        return $http.get("http://localhost:8080/userReq/");
    }

    this.getDataById = function (id) {
        return $http.get("http://localhost:8080/userReq/" + id);
    }

    this.deleteData = function (id) {
        return $http.delete("http://localhost:8080/userReq/" + id);
    }
    this.postData = function (data) {
        console.log(data)
        return $http.post("http://localhost:8080/userReq/", data);
    }
})