import React, {useReducer, Suspense} from 'react'
import Menu from './menu/Menu'
import Loader from './loader/Loader'

function App() {
  console.log('App called')
  const [state, onProceed] = useReducer((_, size) => {
    return size
  }, false)

  const Game = React.lazy(() => {
    return import('./game/Game')
  })

  return (
    <div className='wrapper'>
      {
        state
            ? (
              <Suspense fallback={(<Loader />)}>
                <Game size={state} />
              </Suspense>
            )
            : <Menu onProceed={onProceed} />
      }
    </div>
  )
}

export default App
