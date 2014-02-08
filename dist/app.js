var adjustDefaultCellSize, cellHeightController, cellSizeHandler, cellWidthController, clearHandler, clickHandler, defaultCellHeight, defaultCellWidth, factorController, game, gameContainer, getBoardDimensionsWithCellSize, getFactorValue, initGameBoard, randomize, randomizeHandler, resizeHandler, resizeTimeout, selectallHandler, startStopHandler, staticDefaultCellSize, stepHandler;

game = null;

gameContainer = null;

factorController = null;

cellWidthController = null;

cellHeightController = null;

defaultCellWidth = 10;

defaultCellHeight = 10;

staticDefaultCellSize = defaultCellWidth;

clickHandler = function(id, callback) {
  var trigger;
  trigger = document.getElementById(id);
  return trigger.addEventListener("click", function(e) {
    e.preventDefault();
    return callback.call(this);
  });
};

startStopHandler = function() {
  if (game.loop) {
    this.innerHTML = "Start";
    this.classList.remove("active");
    return game.stop();
  } else {
    this.innerHTML = "Stop";
    this.classList.add("active");
    return game.start(200);
  }
};

stepHandler = function() {
  game.updateStatus();
  return game.step();
};

clearHandler = function() {
  var cell, row, _i, _j, _len, _len1, _ref;
  _ref = game.cells;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    row = _ref[_i];
    for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
      cell = row[_j];
      cell.die();
    }
  }
  return game.updateStatus();
};

randomize = function(factor) {
  var cell, row, _i, _j, _len, _len1, _ref;
  _ref = game.cells;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    row = _ref[_i];
    for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
      cell = row[_j];
      if (Math.random() < factor) {
        cell.live();
      } else {
        cell.die();
      }
    }
  }
  return game.updateStatus();
};

randomizeHandler = function() {
  return randomize(getFactorValue());
};

getFactorValue = function() {
  var value;
  value = parseInt(factorController.value, 10);
  return value / 100;
};

getBoardDimensionsWithCellSize = function(width, height) {
  var results;
  results = {};
  results.width = ~~(gameContainer.offsetWidth / width) + width;
  results.height = ~~(gameContainer.offsetHeight / height) + height;
  return results;
};

cellSizeHandler = function() {
  var dimensions, height, wasRunning, width;
  width = parseInt(cellWidthController.value, 10);
  height = parseInt(cellHeightController.value, 10);
  wasRunning = game.loop;
  if (isNaN(width)) {
    width = defaultCellWidth;
    cellWidthController.value = defaultCellWidth;
  }
  if (isNaN(height)) {
    height = defaultCellHeight;
    cellHeightController.value = defaultCellHeight;
  }
  gameContainer.innerHTML = "";
  dimensions = getBoardDimensionsWithCellSize(width, height);
  game = new Game(dimensions.width, dimensions.height, width, height);
  game.attachTo("game");
  randomize(getFactorValue());
  if (wasRunning) {
    return game.start(200);
  }
};

selectallHandler = function() {
  return this.select();
};

resizeTimeout = null;

resizeHandler = function() {
  clearTimeout(resizeTimeout);
  return resizeTimeout = setTimeout(function() {
    console.log('resize');
    return initGameBoard();
  }, 1000);
};

adjustDefaultCellSize = function() {
  var size, width;
  width = gameContainer.offsetWidth;
  size = staticDefaultCellSize;
  if (width < 630) {
    size = 20;
  } else if (width < 995) {
    size = 15;
  }
  defaultCellWidth = size;
  defaultCellHeight = size;
  cellWidthController.value = size;
  return cellHeightController.value = size;
};

initGameBoard = function() {
  var dimensions;
  adjustDefaultCellSize();
  dimensions = getBoardDimensionsWithCellSize(defaultCellWidth, defaultCellHeight);
  document.getElementById("game").innerHTML = "";
  game = new Game(dimensions.width, dimensions.height, defaultCellWidth, defaultCellHeight);
  game.attachTo("game");
  return randomize(getFactorValue());
};

window.addEventListener("load", function() {
  gameContainer = document.getElementById("game");
  factorController = document.getElementById("factor");
  cellWidthController = document.getElementById("cellwidth");
  cellHeightController = document.getElementById("cellheight");
  initGameBoard();
  factorController.addEventListener("change", randomizeHandler);
  clickHandler("ctrl", startStopHandler);
  clickHandler("step", stepHandler);
  clickHandler("clear", clearHandler);
  clickHandler("rand", randomizeHandler);
  cellWidthController.addEventListener("change", cellSizeHandler);
  cellWidthController.addEventListener("click", selectallHandler);
  cellHeightController.addEventListener("change", cellSizeHandler);
  cellHeightController.addEventListener("click", selectallHandler);
  return window.addEventListener("resize", resizeHandler);
});
