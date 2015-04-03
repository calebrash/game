var Cell, Game;

Cell = (function() {
  function Cell(width, height) {
    var _this = this;
    this.cell = document.createElement("div");
    this.cell.classList.add("cell");
    this.cell.style.width = "" + width + "px";
    this.cell.style.height = "" + height + "px";
    this.cell.addEventListener("click", function() {
      if (_this.alive) {
        return _this.die();
      } else {
        return _this.live();
      }
    });
    this.alive = false;
  }

  Cell.prototype.live = function() {
    this.alive = true;
    return this.cell.classList.add("alive");
  };

  Cell.prototype.die = function() {
    this.alive = false;
    return this.cell.classList.remove("alive");
  };

  return Cell;

})();

Game = (function() {
  function Game(boardWidth, boardHeight, cellWidth, cellHeight) {
    var x, y, _i, _j, _ref, _ref1;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;
    this.board = document.createElement("div");
    this.board.setAttribute("id", "board");
    this.board.style.width = "" + (this.boardWidth * this.cellWidth) + "px";
    this.board.style.height = "" + (this.boardHeight * this.cellHeight) + "px";
    this.loop = false;
    this.cells = [];
    this.status = [];
    for (x = _i = 0, _ref = this.boardHeight - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; x = 0 <= _ref ? ++_i : --_i) {
      if (!this.cells[x]) {
        this.cells[x] = [];
      }
      if (!this.status[x]) {
        this.status[x] = [];
      }
      for (y = _j = 0, _ref1 = this.boardWidth - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; y = 0 <= _ref1 ? ++_j : --_j) {
        this.cells[x][y] = new Cell(this.cellWidth, this.cellHeight);
        this.status[x][y] = false;
        this.board.appendChild(this.cells[x][y].cell);
      }
    }
  }

  Game.prototype.attachTo = function(id) {
    return document.getElementById(id).appendChild(this.board);
  };

  Game.prototype.getStatus = function(x, y) {
    if (this.status[x] && this.status[x][y]) {
      return true;
    }
    return false;
  };

  Game.prototype.step = function() {
    this.updateCells();
    return this.updateStatus();
  };

  Game.prototype.updateCells = function() {
    var neighbors, row, status, x, y, _i, _len, _ref, _results;
    _ref = this.status;
    _results = [];
    for (x = _i = 0, _len = _ref.length; _i < _len; x = ++_i) {
      row = _ref[x];
      _results.push((function() {
        var _j, _len1, _results1;
        _results1 = [];
        for (y = _j = 0, _len1 = row.length; _j < _len1; y = ++_j) {
          status = row[y];
          neighbors = 0;
          if (this.getStatus(x - 1, y - 1)) {
            neighbors = neighbors + 1;
          }
          if (this.getStatus(x, y - 1)) {
            neighbors = neighbors + 1;
          }
          if (this.getStatus(x + 1, y - 1)) {
            neighbors = neighbors + 1;
          }
          if (this.getStatus(x - 1, y)) {
            neighbors = neighbors + 1;
          }
          if (this.getStatus(x + 1, y)) {
            neighbors = neighbors + 1;
          }
          if (this.getStatus(x - 1, y + 1)) {
            neighbors = neighbors + 1;
          }
          if (this.getStatus(x, y + 1)) {
            neighbors = neighbors + 1;
          }
          if (this.getStatus(x + 1, y + 1)) {
            neighbors = neighbors + 1;
          }
          if (neighbors < 2 || neighbors > 3) {
            _results1.push(this.cells[x][y].die());
          } else if (neighbors === 3) {
            _results1.push(this.cells[x][y].live());
          } else {
            _results1.push(void 0);
          }
        }
        return _results1;
      }).call(this));
    }
    return _results;
  };

  Game.prototype.updateStatus = function() {
    var row, status, x, y, _i, _len, _ref, _results;
    _ref = this.status;
    _results = [];
    for (x = _i = 0, _len = _ref.length; _i < _len; x = ++_i) {
      row = _ref[x];
      _results.push((function() {
        var _j, _len1, _results1;
        _results1 = [];
        for (y = _j = 0, _len1 = row.length; _j < _len1; y = ++_j) {
          status = row[y];
          _results1.push(this.status[x][y] = this.cells[x][y].alive);
        }
        return _results1;
      }).call(this));
    }
    return _results;
  };

  Game.prototype.start = function(frequency) {
    var _this = this;
    this.updateStatus();
    return this.loop = setInterval(function() {
      return _this.step();
    }, frequency);
  };

  Game.prototype.stop = function() {
    clearInterval(this.loop);
    return this.loop = false;
  };

  return Game;

})();
