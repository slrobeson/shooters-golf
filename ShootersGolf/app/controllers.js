angular.module("golfApp")
    .controller("teamCtrl", function ($scope, $http) {

        $scope.team = team;

        $scope.shirtsizes = shirtSizes;

        $scope.addPlayer = function (player) {
            if (angular.isDefined(player) && angular.isDefined(player.firstName) && angular.isDefined(player.lastName) && angular.isDefined(player.email) && angular.isDefined(player.tshirt)) {
                team.players.push({
                    firstName: player.firstName,
                    lastName: player.lastName,
                    email: player.email,
                    tshirt: player.tshirt
                });
            }
        };

        $scope.removePlayer = function (index) {
            team.players.splice(index, 1);
        };
    })
    .controller("playerCtrl", function ($scope, $http) {
        $scope.registerPlayer(player)
        {
            $http.post(url, player);
        }
    });