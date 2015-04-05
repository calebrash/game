define(['exports', 'game'], function (exports, _game) {
    'use strict';

    var game = null,
        gameContainer = null,
        // game container element
    factorController = null,
        // randomization factor range input field
    cellWidthController = null,
        // cell width input field
    cellHeightController = null,
        // cell height input field
    defaultCellWidth = 10,
        defaultCellHeight = 10,
        staticDefaultCellSize = defaultCellWidth; // used as reference point for resizing

    /**
     * Generic click handler
     * @param {String} id
     * @param {Function} callback
     */
    var clickHandler = function clickHandler(id, callback) {
        var trigger = document.getElementById(id);
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            callback.call(this);
        });
    };

    /**
     * Start/stop button handler
     * @param {Event} e
     */
    var startStopHandler = function startStopHandler(e) {
        if (game.loop) {
            this.innerHTML = 'Start';
            this.classList.remove('active');
            game.stop();
        } else {
            this.innerHTML = 'Stop';
            this.classList.add('active');
            game.start(200);
        }
    };

    /**
     * Step button handler
     * @param {Event} e
     */
    var stepHandler = function stepHandler(e) {
        game.updateStatus();
        game.step();
    };

    /**
     * Clear button handler
     */
    var clearHandler = function clearHandler() {
        game.cells.forEach(function (row) {
            row.forEach(function (cell) {
                cell.die();
            });
        });
        game.updateStatus();
    };

    /**
     * Randomly add living cells according to a factor, 0 to 1
     * factor = 0: no living cells
     * factor = 0.5: half of cells living
     * factor = 1: all cells living
     * @param {Float} factor
     */
    var randomize = function randomize(factor) {
        game.cells.forEach(function (row) {
            row.forEach(function (cell) {
                if (Math.random() < factor) {
                    cell.live();
                } else {
                    cell.die();
                }
            });
        });
        game.updateStatus();
    };

    /**
     * Randomization factor input handler
     * @return {[type]} [description]
     */
    var randomizeHandler = function randomizeHandler() {
        randomize(getFactorValue());
    };

    /**
     * Normalize factor input value
     * @return {Float}
     */
    var getFactorValue = function getFactorValue() {
        var value = parseInt(factorController.value, 10);
        return value / 100;
    };

    /**
     * Get board dimensions based on cell size
     * @param {Number} width
     * @param {Number} height
     * @return {Object.width}
     * @return {Object.height}
     */
    var getBoardDimensionsWithCellSize = function getBoardDimensionsWithCellSize(width, height) {
        var results = {};
        results.width = ~ ~(gameContainer.offsetWidth / width) + width;
        results.height = ~ ~(gameContainer.offsetHeight / height) + height;
        return results;
    };

    /**
     * Cell size input handler
     */
    var cellSizeHandler = function cellSizeHandler() {
        var width = parseInt(cellWidthController.value, 10),
            height = parseInt(cellHeightController.value, 10),
            wasRunning = game.loop;

        if (isNaN(width)) {
            width = defaultCellWidth;
            cellWidthController.value = defaultCellWidth;
        }
        if (isNaN(height)) {
            height = defaultCellHeight;
            cellHeightController.value = defaultCellHeight;
        }

        gameContainer.innerHTML = '';

        var dimensions = getBoardDimensionsWithCellSize(width, height);
        game = new _game.Game(dimensions.width, dimensions.height, width, height);
        game.attachTo('game');
        randomize(getFactorValue());
        if (wasRunning) {
            game.start(200);
        }
    };

    /**
     * Select all when clicking an input field
     * @param {Event} e
     */
    var selectallHandler = function selectallHandler(e) {
        this.select();
    };

    /**
     * Handle resizing the window
     */
    var resizeHandler = (function () {
        var resizeTimeout = null;
        return function () {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(initGameBoard, 500);
        };
    })();

    /**
     * Increase cell size for smaller screens
     */
    var adjustDefaultCellSize = function adjustDefaultCellSize() {
        var width = gameContainer.offsetWidth,
            size = staticDefaultCellSize;

        if (width < 630) {
            size = 20;
        } else if (width < 995) {
            size = 15;
        }

        defaultCellWidth = size;
        defaultCellHeight = size;
        cellWidthController.value = size;
        cellHeightController.value = size;
    };

    /**
     * Initialize the board
     */
    var initGameBoard = function initGameBoard() {
        adjustDefaultCellSize();
        var dimensions = getBoardDimensionsWithCellSize(defaultCellWidth, defaultCellHeight);

        document.getElementById('game').innerHTML = '';
        game = new _game.Game(dimensions.width, dimensions.height, defaultCellWidth, defaultCellHeight);
        game.attachTo('game');
        randomize(getFactorValue());
    };

    /**
     * Initialize everything
     */
    (function () {
        // elements
        gameContainer = document.getElementById('game');
        factorController = document.getElementById('factor');
        cellWidthController = document.getElementById('cellwidth');
        cellHeightController = document.getElementById('cellheight');

        // initialization
        initGameBoard();

        // factor input
        factorController.addEventListener('change', randomizeHandler);

        // button actions
        clickHandler('ctrl', startStopHandler);
        clickHandler('step', stepHandler);
        clickHandler('clear', clearHandler);
        clickHandler('rand', randomizeHandler);

        // size input 
        cellWidthController.addEventListener('change', cellSizeHandler);
        cellWidthController.addEventListener('click', selectallHandler);
        cellHeightController.addEventListener('change', cellSizeHandler);
        cellHeightController.addEventListener('click', selectallHandler);

        // resizing
        window.addEventListener('resize', resizeHandler);
    })();
});