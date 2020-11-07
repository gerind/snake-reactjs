import React from 'react'
import GameCell from './GameCell'

function GameRow({row, colCount, state}) {
  return (
    <div className='game-row'>
      {new Array(colCount)
          .fill(1)
          .map((_, index) => <GameCell state={state} row={row} col={index} key={index} />)}
    </div>
  )
}

export default GameRow
