import React, {useReducer, useEffect} from 'react'
import GameRow from './GameRow'
import {deadTime, initialGameState, moveTime} from '../constants'
import gameReducer from './gameReducer'

function Game({size}) {
  console.log('Game called')
  const [rowCount, colCount] = size.split('x').map(x => +x)
  const [state, makeMove] = useReducer(gameReducer, null, () => initialGameState(rowCount, colCount))
  const [keyState, pressKey] = useReducer((state, event) => {
    if (['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(event.key)) {
      state.key = event.key
    }
    return state
  }, {key: null})

  useEffect(() => {
    //const timerId = setTimeout(() => makeMove(keyState), moveTime)
    let timerId
    if (state.dead) {
      timerId = setTimeout(() => makeMove({key: 'reset'}), deadTime)
    }
    else {
      timerId = setTimeout(() => makeMove(keyState), moveTime)
    }
    return () => {
      clearTimeout(timerId)
    }
  }, [state, keyState])

  useEffect(() => {
    console.log('added KeyDown listener')
    document.addEventListener('keydown', pressKey)
    return () => {
      console.log('removed KeyDown listener')
      document.removeEventListener('keydown', pressKey)
    }
  }, [])

  return (
    <div className='game'>
      {new Array(rowCount)
          .fill(1)
          .map((_, index) => <GameRow state={state} row={index} colCount={colCount} key={index} />)}
    </div>
  )
}

export default Game
