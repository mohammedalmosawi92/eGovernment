var app = angular.module("app.kayd", ["ngRoute", "requestModule", "idModule", "usersModule", "userReqModule", "usernameModule"]);
app.config(function ($routeProvider) {
    $routeProvider.when("/kayd", {
        templateUrl: "/js/views/kayd/kayd.tpl.html",
        controller: "kaydCtrl"
    })
})


app.controller("kaydCtrl", function ($scope, requestService, idService, usersService, $location, userReqService, usernameService) {
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
        data.type = "اخراج قيد"
        data.date = new Date();
        var req = {
            datas: []
        };
        
        req.userId = userId;
        req.date = new Date();
        req.reqType = "اخراج قيد";
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