/* global angular */
/* global stampit */

const createStamp = stampit.default;

const app = angular
    .module('minesweeperApp', ['ngRoute']);

app.config(function ($routeProvider) {
    // $routeProvider.when('/', {
    //     templateUrl: './src/templates/main.html',
    //     controller: 'mainController'
    // });

    $routeProvider.when('/game', {
        templateUrl: './src/templates/minesweeper.html',
        controller: 'minesweeperController'
    });

    $routeProvider.otherwise({ redirectTo: '/game' });
});

// app.controller('mainController',
//     function ($scope) {
//         console.log('loaded main screen');
//     });

app.controller('minesweeperController',
    function ($scope) {
        console.log('loaded minesweeperController');
    });
