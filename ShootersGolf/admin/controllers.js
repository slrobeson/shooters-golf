angular.module("golfAdmin")
    .controller("playersCtrl", function ($scope, $http, baseUrl) {

        $scope.players = [];

        $http.get("http://localhost:20534/api/players")
            .success(function (data) {
                $scope.players = data;
            });
    })
    .controller("teamsCtrl", function ($scope, $http, $location, $filter) {

        $scope.teams = [];
        $scope.players = [];
        $scope.availablePlayers = [];
        $scope.team = team;

        $http.get("http://localhost:20534/api/teams")
            .success(function (data) {
                $scope.teams = data;
            });

        $http.get("http://localhost:20534/api/players")
            .success(function (data) {
                $scope.players = data;
            });

        $http.get("http://localhost:20534/api/players/available")
            .success(function (data) {
                $scope.availablePlayers = data;
            });

        $scope.addPlayer = function (player) {
            if (angular.isDefined(player)) {
                team.players.push(player);
            }
        };

        $scope.removePlayer = function (index) {
            team.players.splice(index, 1);
        };

        $scope.registerTeam = function () {
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
            });
    })
    .controller("playerCtrl", function ($scope, $http, $routeParams, $location) {
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
    .controller("teamCtrl", function ($scope, $http, $routeParams) {
        $scope.players = [];

        $http.get("http://localhost:20534/api/players/" + $routeParams["team"])
            .success(function (data) {
                $scope.players = data;
            });
    });