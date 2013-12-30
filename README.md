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
```

Then, add some styles to differentiate alive and dead cells.

```css
.cell       { background: white; }
.cell.alive { background: black; }
```
