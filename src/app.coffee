game = null
gameContainer        = null # game container element
factorController     = null # randomization factor range input field
cellWidthController  = null # cell width input field
cellHeightController = null # cell height input field
defaultCellWidth  = 10
defaultCellHeight = 10

# generic click handler
clickHandler = (id, callback) ->
  trigger = document.getElementById id
  trigger.addEventListener "click", (e) ->
    e.preventDefault()
    callback.call @

# start/stop button handler
startStopHandler = () ->
  if game.loop
    @innerHTML = "Start"
    @classList.remove "active"
    game.stop()
  else
    @innerHTML = "Stop"
    @classList.add "active"
    game.start 200

# step button handler
stepHandler = () ->
  game.updateStatus()
  game.step()

# clear button handler
clearHandler = () ->
  cell.die() for cell in row for row in game.cells
  game.updateStatus()

# randomly add living cells according to a factor, 0 to 1
# factor = 0: no living cells
# factor = 0.5: half of cells living
# facotr = 1: all cells living
randomize = (factor) ->
  for row in game.cells
    for cell in row
      if Math.random() < factor
        cell.live()
      else
        cell.die()
  game.updateStatus()

# randomization factor input handler
randomizeHandler = () ->
  randomize getFactorValue()

# normalize factor input value
getFactorValue = () ->
  value = parseInt factorController.value, 10
  value / 100

# get board dimensions based on cell size
# returns { width:w, height:h }
getBoardDimensionsWithCellSize = (width, height) ->
  results = {}
  results.width = ~~(gameContainer.offsetWidth / width) + width
  results.height = ~~(gameContainer.offsetHeight / height) + height
  results

# cell size input handler
cellSizeHandler = () ->
  width = parseInt cellWidthController.value, 10
  height = parseInt cellHeightController.value, 10
  wasRunning = game.loop

  if isNaN width
    width = defaultCellWidth
    cellWidthController.value = defaultCellWidth
  
  if isNaN height
    height = defaultCellHeight
    cellHeightController.value = defaultCellHeight
  
  gameContainer.innerHTML = ""
  dimensions = getBoardDimensionsWithCellSize width, height
  game = new Game dimensions.width, dimensions.height, width, height
  game.attachTo "game"
  randomize getFactorValue()
  if wasRunning then game.start 200

# select all when clicking an input field
selectallHandler = () ->
  @select()

# --------------------------------------------------

window.addEventListener "load", () ->

  gameContainer = document.getElementById "game"
  dimensions = getBoardDimensionsWithCellSize defaultCellWidth, defaultCellHeight

  game = new Game dimensions.width, dimensions.height, defaultCellWidth, defaultCellHeight
  game.attachTo "game"

  factorController = document.getElementById "factor"
  factorController.addEventListener "change",  randomizeHandler

  clickHandler "ctrl", startStopHandler
  clickHandler "step", stepHandler
  clickHandler "clear", clearHandler
  clickHandler "rand", randomizeHandler
  
  cellWidthController = document.getElementById "cellwidth"
  cellHeightController = document.getElementById "cellheight"
  cellWidthController.addEventListener "change", cellSizeHandler
  cellWidthController.addEventListener "click", selectallHandler
  cellHeightController.addEventListener "change", cellSizeHandler
  cellHeightController.addEventListener "click", selectallHandler

  randomize getFactorValue()


