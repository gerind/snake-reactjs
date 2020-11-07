import { BODY, EMPTY, FOOD, initialGameState, killSnake, putSnakeIntoGrid, tryPutFood } from "../constants"

export default function gameReducer(state, {key}) {
  
  let {grid, snake, direction, dead} = state
  const [n, m] = [grid.length, grid[0].length]

  if (dead) {
    return initialGameState(n, m)
  }

  if (key) {
    key = {
      'ArrowUp': 0,
      'ArrowRight': 1,
      'ArrowDown' : 2,
      'ArrowLeft': 3
    }[key]
    if ((key + 2) % 4 !== direction) {
      direction = state.direction = key
    }
  }

  const [headRow, headCol] = moveHead(n, m, ...snake[snake.length - 1], direction)
  snake.push([headRow, headCol])
  if (grid[headRow][headCol] !== FOOD) {
    grid[snake[0][0]][snake[0][1]] = EMPTY
    snake = state.snake = state.snake.slice(1)
  }
  else {
    state.food = null
  }

  if (grid[headRow][headCol] === BODY) {
    killSnake(state)
    return {...state, dead: true}
  }

  putSnakeIntoGrid(state)

  if (!state.food) {
    tryPutFood(state)
  }
  else {
    const [foodRow, foodCol] = state.food
    grid[foodRow][foodCol] = FOOD
  }

  return {...state}
}

function moveHead(n, m, row, col, dir) {
  switch (dir) {
    case 0:
      row = row - 1 < 0 ? n - 1 : row - 1
      break
    case 1:
      col = col + 1 >= m ? 0 : col + 1
      break
    case 2:
      row = row + 1 >= n ? 0 : row + 1
      break
    case 3:
      col = col - 1 < 0 ? m - 1 : col - 1
      break
    default:
      throw new Error('strange dir catched: ' + dir)
  }
  return [row, col]
}
