angular.module("adminApp", ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.when("/players", {
            templateUrl: "/app/views/adminPlayers.html"
        });
        $routeProvider.when("/teams", {
            templateUrl: "/app/views/adminTeams.html"
        });
        $routeProvider.when("/sponsors", {
            templateUrl: "/app/views/adminSponsors.html"
        });
        $routeProvider.otherwise({
            templateUrl: "/app/views/adminHome.html"
        });
    });
 