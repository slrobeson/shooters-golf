angular.module("golfAdmin", ["ngRoute"])
    .constant("baseUrl", "http://localhost:20534/api/")
    .config(function ($routeProvider) {
        $routeProvider.when("/players", {
            templateUrl: "/admin/views/players.html"
        });
        $routeProvider.when("/players/:id", {
            templateUrl: "/admin/views/player.html"
        });
        $routeProvider.when("/teams", {
            templateUrl: "/admin/views/teams.html"
        });
        $routeProvider.when("/teams/:team", {
            templateUrl: "/admin/views/team.html"
        });
        $routeProvider.when("/sponsors", {
            templateUrl: "/admin/views/sponsors.html"
        });
        $routeProvider.otherwise({
            templateUrl: "/admin/views/home.html"
        });
    })
    .controller("golfCtrl", function ($scope) {
        var year = new Date().getFullYear().toString();

        $scope.year = year;
        $scope.yearAbrv = "'" + year.substring(2);
    });
 