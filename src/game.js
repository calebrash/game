/**
 * Controller for individual cells
 * @private
 * @class
 */
class Cell {
    constructor (width, height) {
        this.cell = document.createElement('div');
        this.cell.classList.add('cell');
        this.cell.style.width = `${width}px`;
        this.cell.style.height = `${height}px`;
        this.cell.addEventListener('click', (e) => {
            this.toggle();
        });
    }

    /**
     * The living shall die and the dead shall live again
     */
    toggle () {
        if (this.alive) {
            this.die();
        } else {
            this.live();
        }
    }

    /**
     * Make the cell alive
     */
    live () {
        this.alive = true;
        this.cell.classList.add('alive');
    }

    /**
     * Kill the cell
     */
    die () {
        this.alive = false;
        this.cell.classList.remove('alive');
    }
}

/**
 * Controller for Conway's Game of Life
 * @public
 * @class
 */
class Game {
    /**
     * @param {Number} boardWidth - width of board in pixels
     * @param {Number} boardHeight - height of board in pixels
     * @param {Number} cellWidth - width of cells
     * @param {Number} cellHeight - height of cells
     */
    constructor (boardWidth, boardHeight, cellWidth, cellHeight) {
        this.board = document.createElement('div');
        this.board.id = 'board';
        this.board.style.width = `${boardWidth * cellWidth}px`;
        this.board.style.height = `${boardHeight * cellHeight}px`;

        this.loop = false;
        this.cells = [];
        this.status = [];

        // initialize cells and statuses
        for(let x=0; x<boardHeight; x++) {
            if (!this.cells[x]) {
                this.cells[x] = [];
            }

            if (!this.status[x]) {
                this.status[x] = [];
            }

            for (let y=0; y<boardWidth; y++) {
                this.cells[x][y] = new Cell(cellWidth, cellHeight);
                this.status[x][y] = false; 
                this.board.appendChild(this.cells[x][y].cell);
            }
        }
    }

    /**
     * Add board to element
     * @param {String} elementId
     */
    attachTo (elementId) {
        document.getElementById(elementId).appendChild(this.board);
    }

    /**
     * Get the status of a cell at a particular location (x, y)
     * @param {Number} x
     * @param {Number} y
     * @return {Boolean} dead/alive status of cell
     */
    getStatus (x, y) {
        if (this.status[x] && this.status[x][y]) {
            return true;
        }
        return false;
    }

    /**
     * Advance the simulation one frame
     */
    step () {
        this.updateCells();
        this.updateStatus();
    }

    /**
     * Update the status of all of the cells on the board
     */
    updateCells () {
        this.status.forEach((row, x) => {
            row.forEach((status, y) => {
                let neighbors = 0;
                if (this.getStatus(x-1, y-1)) {
                    neighbors ++;
                }
                if (this.getStatus(x, y-1)) {
                    neighbors ++;
                }
                if (this.getStatus(x+1, y-1)) {
                    neighbors ++;
                }
                if (this.getStatus(x-1, y)) {
                    neighbors ++;
                }
                if (this.getStatus(x+1, y)) {
                    neighbors ++;
                }
                if (this.getStatus(x-1, y+1)) {
                    neighbors ++;
                }
                if (this.getStatus(x, y+1)) {
                    neighbors ++;
                }
                if (this.getStatus(x+1, y+1)) {
                    neighbors ++;
                }

                if (neighbors < 2 || neighbors > 3) {
                    this.cells[x][y].die();
                } else if (neighbors === 3) {
                    this.cells[x][y].live();
                }
            });
        });
    }

    /**
     * Update the status array
     */
    updateStatus () {
        this.status.forEach((row, x) => {
            row.forEach((status, y) => {
                this.status[x][y] = this.cells[x][y].alive;
            });
        });
    }

    /**
     * Start the animation
     * @param {Number} frequency - in ms
     */
    start (frequency) {
        this.updateStatus();
        this.loop = setInterval (() => {
            this.step();
        }, frequency);
    }

    /**
     * Stop the animation
     */
    stop () {
        clearInterval(this.loop);
        this.loop = false;
    }
}

export { Game }
