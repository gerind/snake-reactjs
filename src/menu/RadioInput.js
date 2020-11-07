import React, {useEffect} from 'react'

function RadioInput({value, onChange, selected}) {
  console.log('RadioInput called')

  return (
    <p>
      <input type='radio' name='size' value={value} onChange={onChange} checked={selected === value} />
      {value.split('x').join(' на ')}
    </p>
  )
}

export default RadioInput
