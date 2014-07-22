angular.module("golfApp")
    .controller("teamCtrl", function ($scope) {

        $scope.players = [
            { firstName: "Steve", lastName: "Robeson", email: "slrobeson@speedway.com", tshirt: "xl" },
            { firstName: "Nate", lastName: "King", email: "jnathanking@speedway.com", tshirt: "xl" }
        ];

        $scope.addPlayer = function (player) {
            players.push(player);
        }

        $scope.removePlayer = function (index) {
            players.splice(index, 1);
        }

    });