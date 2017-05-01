var app = angular.module("app.users", ["ngRoute", "usersModule"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/users", {
        templateUrl: "/js/views/users/users.tpl.html",
        controller: "usersCtrl"
    })
})

app.controller("usersCtrl", function ($scope, usersService) {
    
    $scope.loadData = function () {
        $scope.usersList = [];
        $scope.adminList = [];
        usersService.getUsers().then(function (response) {
            var temp = response.data.data;
            temp.map(function(item) {
                item.edit = false;
                return item;
            });
            for (var i = 0; i < temp.length; i++) {
                if (temp[i].privilege === 'admin') {
                    $scope.adminList.push(temp[i])
                } else {
                    $scope.usersList.push(temp[i]);
                }
            }
        }, function (response) {
            console.log(response.status);
        })
    }
    
    $scope.order = true;
    $scope.username = function () {
        $scope.sortUsers = "username";
        $scope.order = !$scope.order
    }
    
    $scope.status = function () {
        $scope.sortUsers = "status";
        $scope.order = !$scope.order
    }
    
    $scope.sortByReqNum = function() {
        $scope.usersList.sort(function(a, b) {
            if(a.requests.length < b.requests.length) {
                return 1;
            } else if(a.requests.length > b.requests.length) {
                return -1;
            }
        })
    }

    $scope.deleteUser = function (id) {
        usersService.deleteUser(id).then(function (response) {
            $scope.loadData();
        }, function (response) {
            console.log(response.status);
        })
    }
    
    $scope.editAdmin = function(id) {
        for(var i = 0; i < $scope.adminList.length; i++) {
            if(id === $scope.adminList[i]._id) {
                $scope.adminList[i].edit = !$scope.adminList[i].edit;
            }
        }
    }
    
    $scope.updateAdmin = function(id, priv) {
        for(var i = 0; i < $scope.adminList.length; i++) {
            if(id === $scope.adminList[i]._id) {
                $scope.adminList[i].edit = !$scope.adminList[i].edit;
            }
        }
        usersService.updateUser(id, {privilege: priv}).then(function() {
            $scope.loadData();
        }, function(response) {
            console.log(response.status);
        })
    }
    
    $scope.editUser = function(id) {
        for(var i = 0; i < $scope.usersList.length; i++) {
            if(id === $scope.usersList[i]._id) {
                $scope.usersList[i].edit = !$scope.usersList[i].edit;
            }
        }
    }
    
    $scope.updateUser = function(id, priv) {
        for(var i = 0; i < $scope.usersList.length; i++) {
            if(id === $scope.usersList[i]._id) {
                $scope.usersList[i].edit = !$scope.usersList[i].edit;
            }
        }
        usersService.updateUser(id, {privilege: priv}).then(function() {
            $scope.loadData();
        }, function(response) {
            console.log(response.status);
        })
    }
})