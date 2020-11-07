import React from 'react'
import { STYLE } from '../constants'

function GameCell({row, col, state}) {

  return (
    <div className='game-cell'>
      <div className='cell' style={STYLE[state.grid[row][col]]}>
        
      </div>
    </div>
  )
}

export default GameCell
