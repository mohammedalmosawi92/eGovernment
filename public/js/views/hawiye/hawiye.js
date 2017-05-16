var app = angular.module("app.hawiye", ["ngRoute", "requestModule", "idModule", "usersModule", "userReqModule", "usernameModule"]);
app.config(function ($routeProvider) {
    $routeProvider.when("/hawiye", {
        templateUrl: "/js/views/hawiye/hawiye.tpl.html",
        controller: "hawiyeCtrl"
    })
})

app.controller("hawiyeCtrl", function ($scope, requestService, idService, usersService, $location, userReqService, usernameService) {
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
        data.type = "هوية"
        data.date = new Date();
        
        var req = {
            datas: []
        };
        
        req.userId = userId;
        req.date = new Date();
        req.reqType = "هوية";
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