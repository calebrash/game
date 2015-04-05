define(['exports'], function (exports) {
    'use strict';

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (descriptor.value) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    Object.defineProperty(exports, '__esModule', {
        value: true
    });
    /**
     * Controller for individual cells
     * @private
     * @class
     */

    var Cell = (function () {
        function Cell(width, height) {
            var _this = this;

            _classCallCheck(this, Cell);

            this.cell = document.createElement('div');
            this.cell.classList.add('cell');
            this.cell.style.width = '' + width + 'px';
            this.cell.style.height = '' + height + 'px';
            this.cell.addEventListener('click', function (e) {
                _this.toggle();
            });
        }

        _createClass(Cell, [{
            key: 'toggle',

            /**
             * The living shall die and the dead shall live again
             */
            value: function toggle() {
                if (this.alive) {
                    this.die();
                } else {
                    this.live();
                }
            }
        }, {
            key: 'live',

            /**
             * Make the cell alive
             */
            value: function live() {
                this.alive = true;
                this.cell.classList.add('alive');
            }
        }, {
            key: 'die',

            /**
             * Kill the cell
             */
            value: function die() {
                this.alive = false;
                this.cell.classList.remove('alive');
            }
        }]);

        return Cell;
    })();

    /**
     * Controller for Conway's Game of Life
     * @public
     * @class
     */

    var Game = (function () {
        /**
         * @param {Number} boardWidth - width of board in pixels
         * @param {Number} boardHeight - height of board in pixels
         * @param {Number} cellWidth - width of cells
         * @param {Number} cellHeight - height of cells
         */

        function Game(boardWidth, boardHeight, cellWidth, cellHeight) {
            _classCallCheck(this, Game);

            this.board = document.createElement('div');
            this.board.id = 'board';
            this.board.style.width = '' + boardWidth * cellWidth + 'px';
            this.board.style.height = '' + boardHeight * cellHeight + 'px';

            this.loop = false;
            this.cells = [];
            this.status = [];

            // initialize cells and statuses
            for (var x = 0; x < boardHeight; x++) {
                if (!this.cells[x]) {
                    this.cells[x] = [];
                }

                if (!this.status[x]) {
                    this.status[x] = [];
                }

                for (var y = 0; y < boardWidth; y++) {
                    this.cells[x][y] = new Cell(cellWidth, cellHeight);
                    this.status[x][y] = false;
                    this.board.appendChild(this.cells[x][y].cell);
                }
            }
        }

        _createClass(Game, [{
            key: 'attachTo',

            /**
             * Add board to element
             * @param {String} elementId
             */
            value: function attachTo(elementId) {
                document.getElementById(elementId).appendChild(this.board);
            }
        }, {
            key: 'getStatus',

            /**
             * Get the status of a cell at a particular location (x, y)
             * @param {Number} x
             * @param {Number} y
             * @return {Boolean} dead/alive status of cell
             */
            value: function getStatus(x, y) {
                if (this.status[x] && this.status[x][y]) {
                    return true;
                }
                return false;
            }
        }, {
            key: 'step',

            /**
             * Advance the simulation one frame
             */
            value: function step() {
                this.updateCells();
                this.updateStatus();
            }
        }, {
            key: 'updateCells',

            /**
             * Update the status of all of the cells on the board
             */
            value: function updateCells() {
                var _this = this;

                this.status.forEach(function (row, x) {
                    row.forEach(function (status, y) {
                        var neighbors = 0;
                        if (_this.getStatus(x - 1, y - 1)) {
                            neighbors++;
                        }
                        if (_this.getStatus(x, y - 1)) {
                            neighbors++;
                        }
                        if (_this.getStatus(x + 1, y - 1)) {
                            neighbors++;
                        }
                        if (_this.getStatus(x - 1, y)) {
                            neighbors++;
                        }
                        if (_this.getStatus(x + 1, y)) {
                            neighbors++;
                        }
                        if (_this.getStatus(x - 1, y + 1)) {
                            neighbors++;
                        }
                        if (_this.getStatus(x, y + 1)) {
                            neighbors++;
                        }
                        if (_this.getStatus(x + 1, y + 1)) {
                            neighbors++;
                        }

                        if (neighbors < 2 || neighbors > 3) {
                            _this.cells[x][y].die();
                        } else if (neighbors === 3) {
                            _this.cells[x][y].live();
                        }
                    });
                });
            }
        }, {
            key: 'updateStatus',

            /**
             * Update the status array
             */
            value: function updateStatus() {
                var _this = this;

                this.status.forEach(function (row, x) {
                    row.forEach(function (status, y) {
                        _this.status[x][y] = _this.cells[x][y].alive;
                    });
                });
            }
        }, {
            key: 'start',

            /**
             * Start the animation
             * @param {Number} frequency - in ms
             */
            value: function start(frequency) {
                var _this = this;

                this.updateStatus();
                this.loop = setInterval(function () {
                    _this.step();
                }, frequency);
            }
        }, {
            key: 'stop',

            /**
             * Stop the animation
             */
            value: function stop() {
                clearInterval(this.loop);
                this.loop = false;
            }
        }]);

        return Game;
    })();

    exports.Game = Game;
});