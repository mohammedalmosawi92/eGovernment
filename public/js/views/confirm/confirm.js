var app = angular.module("app.confirm", ["ngRoute", "tempModule", "requestModule"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/confirm", {
        templateUrl: "/js/views/confirm/confirm.tpl.html",
        controller: "confirmCtrl"
    })
})

app.controller("confirmCtrl", function ($scope, tempService, requestService) {
    
    $scope.loadData = function () {
        tempService.getData().then(function (response) {
            $scope.list = response.data.data;
            $scope.list.map(function(item) {
                item.edit = false;
                var da = new Date(item.dob);
                item.dob = da;
                return item
            });
            console.log($scope.list);
        }, function (response) {
            console.log(response.status);
        })
    }
    
    $scope.confirmData = function(item) {
        requestService.postData(item).then(function(response) {
           tempService.deleteData(item._id).then(function() {
               $scope.loadData()
           }, function(response) {
               console.log(response.status);
           })
        }, function(response) {
            console.log("This person already exists in the database ", response.status)
        })
    }
    
    $scope.deleteItem = function(id) {
        tempService.deleteData(id).then(function() {
            $scope.loadData()
        })
    }
    
    $scope.edit = function(index) {
        $scope.list[index].edit = !$scope.list[index].edit;
    }
    
    $scope.save = function(index, data, id) {
        $scope.list[index].edit = !$scope.list[index].edit;
        tempService.updateData(id, data).then(function() {
            $scope.loadData();
        })
    }
})