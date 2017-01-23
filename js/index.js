var ligApp = angular.module ('ligApp', []);

ligApp.controller('indexController', function indexController($scope, $http) {
    $scope.projects = [];
    $scope.contributions = [];
    $scope.authors = {};

    $http.get ('data/projects.json').then (function (data) {
        $scope.projects = data.data;
    });

    $http.get ('data/authors.json').then (function (data) {
        $scope.authors = data.data;
    });

    $http.get ('data/contributions.json').then (function (data) {
        $scope.contributions = data.data;
    });

    $http.get ('data/members.json').then (function (data) {
        $scope.members = data.data;
    });
});