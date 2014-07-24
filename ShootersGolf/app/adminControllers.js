angular.module("adminApp")
    .controller("playersCtrl", function($scope, $http, baseUrl) {

        $scope.players = [];

        $http.get("http://localhost:20534/api/players")
            .success(function(data) {
                $scope.players = data;
            })
            .error(function(error) {
                $scope.data.error = error;
            });
    })
    .controller("teamsCtrl", function($scope, $http) {

        $scope.teams = [];

        $http.get("http://localhost:20534/api/teams")
            .success(function(data) {
                $scope.teams = data;
            })
            .error(function(error) {
                $scope.data.error = error;
            });
    })
    .controller("sponsorsCtrl", function($scope, $http) {

        $scope.sponsors = [];

        $http.get("http://localhost:20534/api/sponsors")
            .success(function(data) {
                $scope.sponsors = data;
            })
            .error(function(error) {
                $scope.data.error = error;
            });
    })
    .controller("playerDetailCtrl", function($scope, $http, $routeParams, $location) {
        $scope.player = {};

        var id = $routeParams["id"];
        $http({
                method: 'GET',
                url: "http://localhost:20534/api/players/" + id
            }).
            success(function(data) {
                $scope.player = data;
            }).
            error(function(error) {
                $scope.data.error = error;
            });

        $scope.deletePlayer = function () {

            $http({
                method: "DELETE",
                url: "http://localhost:20534/api/players/" + id
            }).success(function() {
                $location.path("/players");
            });

        };
    });