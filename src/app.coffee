game = null
factorController = null
cellWidth = 8
cellHeight = 8

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

  container = document.getElementById "game"
  boardWidth = ~~(container.offsetWidth / cellWidth) + cellWidth
  boardHeight = ~~(container.offsetHeight / cellHeight) + cellHeight

  game = new Game boardWidth, boardHeight, cellWidth, cellHeight
  game.attachTo "game"

  factorController = document.getElementById "factor"
  factorController.addEventListener "change",  randomizeHandler

  clickHandler "ctrl", startStopHandler
  clickHandler "step", stepHandler
  clickHandler "clear", clearHandler
  clickHandler "rand", randomizeHandler

  randomize getFactorValue()
