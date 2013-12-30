class Cell
  constructor: (width, height) ->
    @cell = document.createElement "div"
    @cell.classList.add "cell"
    @cell.style.width = "#{width}px"
    @cell.style.height = "#{height}px"
    @cell.addEventListener "click", () =>
      if @alive then @die() else @live()
    @alive = no
  
  live: () ->
    @alive = yes
    @cell.classList.add "alive"
  
  die: () ->
    @alive = no
    @cell.classList.remove "alive"



class Game
  constructor: (@boardWidth, @boardHeight, @cellWidth, @cellHeight) ->
    @board = document.createElement "div"
    @board.setAttribute "id", "board"
    @board.style.width = "#{@boardWidth*@cellWidth}px"
    @board.style.height = "#{@boardHeight*@cellHeight}px"
    @loop   = no
    @cells  = []
    @status = []
    for x in [0..@boardHeight-1]
      @cells[x]  = [] if not @cells[x]
      @status[x] = [] if not @status[x]
      for y in [0..@boardWidth-1]
        @cells[x][y]  = new Cell @cellWidth, @cellHeight
        @status[x][y] = no
        @board.appendChild @cells[x][y].cell

  attachTo: (id) ->
    document.getElementById(id).appendChild @board

  getStatus: (x, y) ->
    if @status[x] and @status[x][y]
      return yes
    return no

  step: () ->
    @updateCells()
    @updateStatus()

  updateCells: () ->
    for row, x in @status
      for status, y in row
        neighbors = 0
        if @getStatus x-1, y-1 then neighbors = neighbors + 1
        if @getStatus x, y-1   then neighbors = neighbors + 1
        if @getStatus x+1, y-1 then neighbors = neighbors + 1
        if @getStatus x-1, y   then neighbors = neighbors + 1
        if @getStatus x+1, y   then neighbors = neighbors + 1
        if @getStatus x-1, y+1 then neighbors = neighbors + 1
        if @getStatus x, y+1   then neighbors = neighbors + 1
        if @getStatus x+1, y+1 then neighbors = neighbors + 1

        if neighbors < 2 or neighbors > 3
          @cells[x][y].die()
        else if neighbors is 3
          @cells[x][y].live()

  updateStatus: () ->
    for row, x in @status
      for status, y in row
        @status[x][y] = @cells[x][y].alive    

  start: (frequency) ->
    @updateStatus()
    @loop = setInterval () =>
      @step()
    , frequency

  stop: () ->
    clearInterval @loop
    @loop = no



