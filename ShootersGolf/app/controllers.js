angular.module("golfApp")
    .controller("teamCtrl", function ($scope, $http, $location, baseUrl) {

        $scope.team = team;

        $scope.addPlayer = function (player) {
            if (angular.isDefined(player) && angular.isDefined(player.firstName) && angular.isDefined(player.lastName) && angular.isDefined(player.email) && angular.isDefined(player.shirtsize)) {
                team.players.push({
                    firstName: player.firstName,
                    lastName: player.lastName,
                    email: player.email,
                    shirtsize: player.shirtsize
                });
            }
        };

        $scope.removePlayer = function (index) {
            team.players.splice(index, 1);
        };

        $scope.registerTeam = function () {
            $http.post("http://localhost:20534/api/teams", team)
            .success(function (data) {
                $location.path("/confirmation");
            });
        };
    })
    .controller("playerCtrl", function ($scope, $http, $location) {
        $scope.registerPlayer = function (player) {
            $http.post("http://localhost:20534/api/players", player)
                .success(function (data) {
                    $location.path("/confirmation");
                });
        };
    })
    .controller("sponsorCtrl", function ($scope, $http, $location) {
        $scope.registerSponsor = function (sponsor) {
            $http.post("http://localhost:20534/api/sponsors", sponsor)
                .success(function (data) {
                    $location.path("/confirmation");
                });
        };
    })
    .controller("sponsorshipCtrl", function ($scope, $http, $location) {
        $scope.sponsors = [];

        $http.get("http://localhost:20534/api/sponsors")
            .success(function (data) {
                $scope.sponsors = data;
            })
            .error(function (error) {
                $scope.data.error = error;
            });
    });