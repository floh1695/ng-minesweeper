/* global angular */
/* global stampit */

const createStamp = stampit.default;

const randomInt = (cap) => {
    return Math.floor(Math.random() * cap);
}

const Cell = createStamp({
    props: {
        hasBomb: false,
        hasFlag: false,
        hasBeenCLicked: false
    },
    init({ hasBomb = this.hasBomb }) {
        this.hasBomb = hasBomb;
    },
    methods: {
        click() {
            this.hasBeenCLicked = true;
            return this.hasBomb;
        },
    }
});

const Board = createStamp({
    props: {
        cells: null,
    },
    init({ height = 9, width = 9, bombCount = 10 }) {
        this.cells = [];
        for (let x = 0; x < height; x++) {
            let nextArray = [];
            for (let y = 0; y < width; y++) {
                nextArray.push(Cell());
            }
            this.cells.push(nextArray);
        }
        this.seedBombs(bombCount);
    },
    methods: {
        click(x, y) {
            console.log('Clicked cell ', {x, y});
            const cell = this.cells[x][y];
            const hadBomb = cell.click();
            return hadBomb;
        },
        numberAt(x, y) {
            const cells = [];
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const isCenterCell = (i === 0 && j === 0)
                    const isRealRow = Boolean(this.cells[x + i]);
                    if (isCenterCell) { continue; }
                    if (!isRealRow) { continue; }
                    const cell = this.cells[x + i][y + j];
                    console.log({ xy: { x: x + i, y: y + i }, cell });
                    cells.push(cell);
                }
            }
            console.log(cells);
            return cells
                .map(cell => {
                    if (cell) {
                        if (cell.hasBomb) { return 1; }
                    }
                    return 0;
                })
                .reduce((bombs, isBoom) => bombs + isBoom);
        },
        seedBombs(bombCount) {
            const height = this.cells.length;
            const width = this.cells[0].length;
            console.log({ height, width });

            for (let i = 0; i < bombCount; i++) {
                const randomX = randomInt(height);
                const randomY = randomInt(width);
                const cell = this.cells[randomX][randomY];
                cell.hasBomb = true;
            }
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
            this.cells.forEach(row => {
                const rowString = row
                    .map(cell => cell.hasBomb ? 'B' : '.')
                    .join('');
                console.log(rowString);
            });
        }
    }
});

const board = PrintableBoard();

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
        $scope.board = Board();
    });
