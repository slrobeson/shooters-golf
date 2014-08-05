angular.module("golfAdmin")
    .controller("playersCtrl", function ($scope, $http, baseUrl) {

        $scope.players = [];

        $http.get("http://localhost:20534/api/players")
            .success(function (data) {
                $scope.players = data;
            })
            .error(function (error) {
                $scope.data.error = error;
            });
    })
    .controller("teamsCtrl", function ($scope, $http) {

        $scope.teams = [];

        $http.get("http://localhost:20534/api/teams")
            .success(function (data) {
                $scope.teams = data;
            })
            .error(function (error) {
                $scope.data.error = error;
            });

        $scope.registerTeam = function (team) {
            $http.post("http://localhost:20534/api/teams", team)
            .success(function (data) {
                $location.path("/teams");
            });
        };
    })
    .controller("sponsorsCtrl", function ($scope, $http) {

        $scope.sponsors = [];

        $http.get("http://localhost:20534/api/sponsors")
            .success(function (data) {
                $scope.sponsors = data;
            })
            .error(function (error) {
                $scope.data.error = error;
            });
    })
    .controller("playerDetailCtrl", function ($scope, $http, $routeParams, $location) {
        $scope.player = {};
        $scope.teams = {};
        $scope.availableTeams = function (item) {
            return item.playerCount < 4;
        };

        $http.get("http://localhost:20534/api/players/" + $routeParams["id"])
            .success(function (data) {
                $scope.player = data;
            });

        $http.get("http://localhost:20534/api/teams/")
            .success(function (data) {
                $scope.teams = data;
            });

        $scope.deletePlayer = function (playerId) {
            $http({
                method: "DELETE",
                url: "http://localhost:20534/api/" + playerId
            }).success(function () {
                $location.path("/players");
            });
        };

        $scope.addTeam = function (team) {
            $scope.player.teamName = team.teamName;

            $http({
                method: "PUT",
                url: "http://localhost:20534/api/players/",
                data: $scope.player
            }).success(function () {
                $location.path("/" + $scope.player.id);
            });
        };
    })
    .controller("teamDetailCtrl", function ($scope, $http, $routeParams) {
        $scope.players = [];

        $http.get("http://localhost:20534/api/players/" + $routeParams["team"])
            .success(function (data) {
                $scope.players = data;
            });
    });