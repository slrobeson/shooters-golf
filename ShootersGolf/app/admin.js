angular.module("adminApp", ["ngRoute"])
    .constant("baseUrl", "http://localhost:20534/api/")
    .config(function ($routeProvider) {
        $routeProvider.when("/players", {
            templateUrl: "/app/views/adminPlayers.html"
        });
        $routeProvider.when("/players/:id", {
            templateUrl: "/app/views/adminPlayerDetail.html"
        });
        $routeProvider.when("/teams", {
            templateUrl: "/app/views/adminTeams.html"
        });
        $routeProvider.when("/teams/:team", {
            templateUrl: "/app/views/adminTeamDetail.html"
        });
        $routeProvider.when("/sponsors", {
            templateUrl: "/app/views/adminSponsors.html"
        });
        $routeProvider.otherwise({
            templateUrl: "/app/views/adminHome.html"
        });
    });
 