var ligApp = angular.module ('ligApp', ["ngRoute"]);

ligApp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/index.html",
        controller : "indexController"
    })
    .when("/pool", {
        templateUrl : "views/pool.html",
        controller : "poolController"
    })
    .otherwise({
        templateUrl : "views/index.html",
        controller : "indexController"
    });
});