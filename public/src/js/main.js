/* global angular */
/* global stampit */

const createStamp = stampit.default;

const Cell = createStamp({
    props: {
        hasBomb: false
    },
    init({ hasBomb = this.hasBomb }) {
        this.hasBomb = hasBomb;
    }
});

const Board = createStamp({
    props: {
        inner: null
    },
    init({ height = 9, width = 9, bombCount = 10 }) {
        this.inner = [];
        for (let x = 0; x < height; x++) {
            let nextArray = [];
            for (let y = 0; y < width; y++) {
                nextArray.push(Cell());
            }
            this.inner.push(nextArray);
        }
    }
});

const Printable = createStamp({
    methods: {
        print() {
            throw Error('Not yet Implemented');
        }
    }
});

const PrintableBoard = createStamp(Board, Printable, {
    methods: {
        print() {
            this.inner.forEach(row => {
                const rowString = row
                    .map(cell => cell.hasBomb ? 'B' : '.')
                    .join('');
                console.log(rowString);
            });
        }
    }
});

const boardSize = 9;
const board = {};
for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
        board[[i, j]]
    }
}

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
        $scope.array = [1, 2, 3, 4];
    });
