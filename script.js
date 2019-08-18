var vm = new Vue({
  el: '#app',
  data() {
    var maxBoard = 100
    return {
      rows: 16,
      columns: 16,
      cellSize: 20,
      offsetX: 0.13,
      offsetY: 0.03,
      repeat: -1,
      board: Array.from('!'.repeat(maxBoard)).map(width => {
        return Array.from(' '.repeat(maxBoard))
      }),
      brushes: [
        {
          name: '✕',
          nb: 'Kryss'
        },
        {
          name: '●',
          nb: 'Sirkel'
        },
        {
          name: '○',
          nb: 'Sirkel'
        },
        {
          name: '▧',
          nb: 'Mørk'
        },
        {
          name: '◐',
          nb: 'Halvsirkel'
        },
        {
          name: '▲',
          nb: 'Trekant'
        },
        {
          name: ' ',
          nb: 'Viskelær'
        }
      ],
      activeBrush: 0
    }
  },
  watch: {
    cellSize() {
      this.canvasResize()
    }
  },
  computed: {
    boardDisplay() {
      return this.board.slice(0, this.rows).map(row => {
        return row.slice(0, this.columns)
      })
    }
  },
  methods: {
    canvasResize() {
      resizeCanvas(this.rows * this.cellSize, this.columns * this.cellSize)
      textSize(this.cellSize)
    },
    saveImg() {
      var tmpCellSize = this.cellSize
      this.cellSize = 50
      this.canvasResize()
      setTimeout(() => {
        save(canvas, 'Mitt strikkebrett')
        this.cellSize = tmpCellSize
        this.canvasResize()
      }, 0)
    }
  }
})

var canvas
function setup() {
  canvas = createCanvas()
  canvas.parent('canvasHolder')
  vm.canvasResize()
  textAlign(CENTER, TOP)
}

function draw() {
  mouseDown()
  background(255)
  fill(233)
  stroke(120)
  strokeWeight(0.4)
  vm.boardDisplay.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      fill(255)
      rect(
        rowIndex * vm.cellSize,
        cellIndex * vm.cellSize,
        vm.cellSize,
        vm.cellSize
      )
      fill(0)
      text(
        cell,
        rowIndex * vm.cellSize + vm.cellSize * vm.offsetX,
        cellIndex * vm.cellSize + vm.cellSize * vm.offsetY,
        vm.cellSize,
        vm.cellSize
      )
    })
  })
  strokeWeight(1)
  stroke(255, 0, 0)
  line(vm.cellSize * vm.repeat, 0, vm.cellSize * vm.repeat, height)
}

function mouseDown() {
  if (mouseX < 0 || !mouseIsPressed) return

  var x = Math.floor(rangeMap(mouseX, width, vm.columns))
  var y = Math.floor(rangeMap(mouseY, height, vm.rows))

  var activeBrushName = vm.brushes.find(elem => {
    return elem.name == vm.brushes[vm.activeBrush].name
  }).name

  Vue.set(vm.board[x], y, activeBrushName)
}

function rangeMap(input, inputMax, outputMax) {
  return (input * outputMax) / inputMax
}
