
// format AxB!
export const sizes = [
  '8x8',
  '16x16',
  '24x24',
  '28x28',
  '32x32',
  '36x36',
  '40x40',
  '44x44',
  '48x48'
]

// ms between moves
export const moveTime = 100
// ms after death
export const deadTime = 2000

// GameStateGrid types
export const EMPTY = 0
export const BODY  = 1
export const HEAD  = 2
export const FOOD  = 3
export const DEAD  = 4

// Grid colors
export const STYLE = {
  [EMPTY]: {},
  [BODY]: {
    background: 'rgb(114, 75, 255)'
  },
  [HEAD]: {
    background: 'blue'
  },
  [FOOD]: {
    background: 'orange'
  },
  [DEAD]: {
    background: 'red'
  }
}

// initial Game state
export function initialGameState(rowCount, colCount) {
  console.log('initialGameState called')
  return putSnakeIntoGrid({
    grid: new Array(rowCount)
        .fill(1)
        .map(() => new Array(colCount).fill(EMPTY)),
    snake: [[1, 1], [1, 2], [1, 3]],
    direction: 1,
    food: null,
    dead: false
  })
}

// заполнить grid по данным массива snake
export function putSnakeIntoGrid(state) {
  let prevRow, prevCol
  state.snake.forEach(([row, col]) => {
    state.grid[row][col] = HEAD
    if (typeof prevRow !== 'undefined') {
      state.grid[prevRow][prevCol] = BODY
    }
    [prevRow, prevCol] = [row, col]
  })

  return state
}

// Добавляет еду если для неё есть место
export function tryPutFood(state) {
  const [row, col] = [Math.random() * state.grid.length, Math.random() * state.grid[0].length]
  state.food = [Math.floor(row), Math.floor(col)]
  return state
}

// Заменяет ячейки умершей змеи на DEAD
export function killSnake(state) {
  state.snake.forEach(([row, col]) => {
    state.grid[row][col] = DEAD
  })
  return state
}
