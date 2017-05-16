var app = angular.module("app.sejel", ["ngRoute", "requestModule", "idModule", "usersModule", "userReqModule", "usernameModule"]);
app.config(function ($routeProvider) {
    $routeProvider.when("/sejel", {
        templateUrl: "/js/views/sejel/sejel.tpl.html",
        controller: "sejelCtrl"
    })
})

app.controller("sejelCtrl", function ($scope, requestService, idService, usersService, $location, userReqService, usernameService) {
    var userId = idService.getId();
    var username = usernameService.getUsername();
    $scope.loadData = function () {
        requestService.getDataByUserId(userId).then(function (response) {
            $scope.item = response.data.data;
            console.log($scope.item);
        }, function (response) {
            console.log(response.status);
        })
    }
    
    $scope.send = function(item) {
        var data = {}
        for(key in item) {
            data[key] = item[key]
        }
        data.type = "سجل عدلي"
        data.date = new Date();
        
        var req = {
            datas: []
        };
        
        req.userId = userId;
        req.date = new Date();
        req.reqType = "سجل عدلي";
        req.datas.push(data);
        req.username = username;
        
        userReqService.postData(req).then(function (response) {
        }, function (err) {
            console.log(err.status)
        });
        
        usersService.postRequestType(userId, data).then(function(response) {
        }, function(response) {
            console.log(response.status);
        })
    }
    $scope.changePath = function() {
        $('#send-modal').modal('hide');
        $location.path("/");   
    }
})