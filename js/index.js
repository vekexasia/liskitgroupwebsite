var ligApp = angular.module ('ligApp', []);

ligApp.controller('indexController', function indexController($scope, $http) {
    $scope.projects = [];
    $scope.contributions = [];
    $scope.authors = {};
    $scope.events = [];
    $scope.lignode = "liskwallet.punkrock.me"
    $scope.fulig = {
        address: '13861531827625059307L',
        balance: null
    };

    $http.get ('https://' + $scope.lignode + '/api/accounts/getBalance?address=' + $scope.fulig.address).then (function (data) {
        $scope.fulig.balance = parseInt (data.data.balance) / 100000000;
    });
    $http.get ('https://' + $scope.lignode + '/api/transactions?limit=3&recipientId=' + $scope.fulig.address).then (function (data) {
        console.log("Income");
        console.log(data.data.transactions);
        $scope.income = data.data.transactions;
    });
    $http.get ('https://' + $scope.lignode + '/api/transactions?limit=3&senderId=' + $scope.fulig.address).then (function (data) {
        console.log(data.data.transactions);
        $scope.outcome = data.data.transactions;
    });
    $http.get ('data/projects.json').then (function (data) {
        $scope.projects = data.data;
    });

    $http.get ('data/events.json').then (function (data) {
        $scope.events = data.data;
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