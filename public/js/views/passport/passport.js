var app = angular.module("app.passport", ["ngRoute", "requestModule", "idModule", "usersModule", "userReqModule", "usernameModule"]);
app.config(function ($routeProvider) {
    $routeProvider.when("/passport", {
        templateUrl: "/js/views/passport/passport.tpl.html",
        controller: "passportCtrl"
    })
})



app.controller("passportCtrl", function ($scope, requestService, idService, usersService, userReqService, usernameService, $location) {
    var userId = idService.getId();
    var username = usernameService.getUsername();
    $scope.loadData = function () {
        requestService.getDataByUserId(userId).then(function (response) {
            $scope.item = response.data.data;
            $scope.item.validity = "year"
        }, function (response) {
            console.log(response.status);
        })
    }

    $scope.send = function (item) {
        var data = {};
        
        for (key in item) {
            data[key] = item[key]
        }
        
        data.type = "جواز سفر"
        data.date = new Date();
        
        var req = {
            datas: []
        };
        
        req.userId = userId;
        req.date = new Date();
        req.reqType = "جواز سفر";
        req.datas.push(data);
        req.username = username;
        
        userReqService.postData(req).then(function (response) {
        }, function (err) {
            console.log(err.status)
        });
        
        usersService.postRequestType(userId, data).then(function (response) {
        }, function (response) {
            console.log(response.status);
        })
    }
    $scope.changePath = function() {
        $('#send-modal').modal('hide');
        $location.path("/");   
    }
})