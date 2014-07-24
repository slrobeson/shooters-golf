angular.module("golfApp")
    .constant("baseUrl", "http://localhost:20534/api/players/")
    .controller("playersCtrl", function($scope, $http, $resource, baseUrl) {

        $scope.currentPlayer = null;

        $scope.playersResource = $resource(baseUrl + ":id", { id: "@id" }, { create: { method: "POST" }, save: { method: "PUT" } });

        $scope.listPlayers = function() {
            $scope.players = $scope.playersResource.query();
            $scope.players.$promise.then(function(data) {
                // do something with the data
            });
        }

        $scope.deletePlayer = function(player) {
            player.$delete().then(function() {
                $scope.players.splice($scope.players.indexOf(player), 1);
            });

            $location.path("/players");
        }

        $scope.createPlayer = function(player) {
            new $scope.playersResource(player).create().then(function(newPlayer) {
                    $scope.players.push(newPlayer);
                    $location.path("/players");
                });
        }

        $scope.editOrCreatePlayer = function(player) {
            $scope.currentPlayer = player ? player : {};
        }

        $scope.saveEdit = function(player) {
            if (angular.isDefined(player.id)) {
                $scope.updatePlayer(player);
            } else {
                $scope.createPlayer(player);
            }
        }

        $scope.cancelEdit = function() {
            if ($scope.currentPlayer && $scope.currentPlayer.$get) {
                $scope.currentPlayer.$get();
            }
            $scope.currentPlayer = {};
            $location.path("/players");
        }

        $scope.listPlayers();
    });