# Conway's Game of Life

This is a DOM-centric controller for Conway's Game of Life. Instantiating a new `Game` object creates an game board and an array of cells.

## Usage
### new Game(boardWidth, boardHeight, cellWidth, cellHeight)
- boardWidth, in cells
- boardHeight, in cells
- cellWidth, in pixels
- cell width, in pixels

To add a game board to a page, create a new `Game` object and attach the board to an element.

```javascript
// create a 10x10 board of 5x5 cells
// total board width is 50px
var game = new Game(10, 10, 5, 5);

// attach the board to the page manually
document.getElementById('board').appendChild(game.board);

// OR use the built-in method
game.attachTo('board');

// start the game, updating every 200ms
game.start(200);
```

Then, add some styles to differentiate alive and dead cells.

```css
.cell       { background: white; }
.cell.alive { background: black; }
```

## Methods

### Game

#### attachTo(id)

Attach the game to a element by `#id`. 

#### getStatus(x, y)

Get the alive/dead (`true` or `false`) status for a cell at (x,y). Returns `false` if x or y is out of range.

#### step()

Advance one generation.

#### updateCells()

Update cells for one generation.

#### updateStatus()

Update status object for current generation.

#### start(frequency)

Start the game, updating every `frequency`ms.

#### stop()

Stop the game.


### Cell

To access an individual cell, use `game.cells[n][m]`.

#### live()

Set cell status to living.

#### die()

Set cell status to dead.


