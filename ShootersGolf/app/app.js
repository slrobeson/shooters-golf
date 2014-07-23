angular.module("golfApp", ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.when("/about", {
            templateUrl: "/app/views/about.html"
        });
        $routeProvider.when("/register", {
            templateUrl: "/app/views/register.html"
        });
        $routeProvider.when("/team", {
            templateUrl: "/app/views/team.html"
        });
        $routeProvider.when("/player", {
            templateUrl: "/app/views/player.html"
        });
        $routeProvider.when("/sponsorship", {
            templateUrl: "/app/views/sponsorship.html"
        });
        $routeProvider.when("/confirmation", {
            templateUrl: "/app/views/confirmation.html"
        });
        $routeProvider.otherwise({
            templateUrl: "/app/views/home.html"
        });
    })
    .controller("golfCtrl", function ($scope) {
        var year = new Date().getFullYear().toString();

        $scope.year = year;
        $scope.yearAbrv = "'" + year.substring(2);
    });
 