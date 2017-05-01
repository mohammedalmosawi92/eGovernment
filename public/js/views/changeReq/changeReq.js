var app = angular.module("app.changeReq", ["ngRoute", "changeModule", "idModule", "usernameModule"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/changeReq", {
        templateUrl: "/js/views/changeReq/changeReq.tpl.html",
        controller: "changeReqCtrl"
    })
})

app.controller("changeReqCtrl", function ($scope, changeService, usernameService, idService) {
    var username = usernameService.getUsername();
    var id = idService.getId();

    $scope.change = [{
        type: "الاسم الاول,firstName"
    }];

    $scope.addChange = function () {
        $scope.change.push({
            type: "الاسم الاول,firstName"
        });
    }

    $scope.personalImage = function (file) {
        for (var i = 0; i < $scope.change.length; i++) {
            if ($scope.change[i].type === 'الصورة الشمسية,personalImage') {
                $scope.change[i].value = file.value;
            }
        }
    }

    $scope.idImage = function (file) {
        for (var i = 0; i < $scope.change.length; i++) {
            if ($scope.change[i].type === 'صورة الهوية,idImage') {
                $scope.change[i].value = file.value;
            }
        }
    }

    $scope.sendChange = function () {
        var newData = {
            change: $scope.change.slice(0, 5),
            username: username,
            userId: id
        }
        changeService.postData(newData).then(function (response) {
            $scope.success = true;
            $scope.fail = false;
        }, function (response) {
            $scope.success = false;
            $scope.fail = true;
            console.log(response.status);
        });
    }
})