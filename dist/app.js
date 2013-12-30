var clearHandler, clickHandler, factorController, game, getFactorValue, randomize, randomizeHandler, startStopHandler, stepHandler;

game = null;

factorController = null;

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

window.addEventListener("load", function() {
  game = new Game(150, 80, 8, 8);
  game.attachTo('game');
  factorController = document.getElementById("factor");
  clickHandler("ctrl", startStopHandler);
  clickHandler("step", stepHandler);
  clickHandler("clear", clearHandler);
  clickHandler("rand", randomizeHandler);
  factorController.addEventListener("change", function() {
    return randomize(getFactorValue());
  });
  return randomize(getFactorValue());
});
