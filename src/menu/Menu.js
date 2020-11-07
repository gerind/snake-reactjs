import React, {useReducer} from 'react'
import RadioInput from './RadioInput'
import {sizes} from '../constants'

function Menu({onProceed}) {
  console.log('Menu called')

  // Почему при первом вызове два срабатывания подряд??????????
  const [selected, onChange] = useReducer((state, event) => {
    // console.log('Change selected', event.target.value)
    return event.target.value
  }, sizes[0])

  return (
    <div className='menu'>
      <p>Выберите размер поля</p>
      <form onSubmit={e => {e.preventDefault(); onProceed(selected)}} >
        {sizes.map(size => <RadioInput value={size} key={size} onChange={onChange} selected={selected} />)}
        <button type='submit'>
          Начать игру
        </button>
      </form>
    </div>
  )
}

export default Menu
