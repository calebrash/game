game = null
factorController = null

clickHandler = (id, callback) ->
  trigger = document.getElementById id
  trigger.addEventListener "click", (e) ->
    e.preventDefault()
    callback.call @

startStopHandler = () ->
  if game.loop
    @innerHTML = "Start"
    @classList.remove "active"
    game.stop()
  else
    @innerHTML = "Stop"
    @classList.add "active"
    game.start 200

stepHandler = () ->
  game.updateStatus()
  game.step()

clearHandler = () ->
  cell.die() for cell in row for row in game.cells
  game.updateStatus()

randomize = (factor) ->
  for row in game.cells
    for cell in row
      if Math.random() < factor
        cell.live()
      else
        cell.die()
  game.updateStatus()

randomizeHandler = () ->
  randomize getFactorValue()

getFactorValue = () ->
  value = parseInt factorController.value, 10
  value / 100

# --------------------------------------------------

window.addEventListener "load", () ->
  game = new Game(150, 80, 8, 8);
  game.attachTo('game');
  factorController = document.getElementById "factor"
  clickHandler "ctrl", startStopHandler
  clickHandler "step", stepHandler
  clickHandler "clear", clearHandler
  clickHandler "rand", randomizeHandler
  factorController.addEventListener "change", () ->
    randomize getFactorValue()
  randomize getFactorValue()
