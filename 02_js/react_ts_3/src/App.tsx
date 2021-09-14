import { Counter } from 'Counter'
import React from 'react'
import { TextField } from 'TextField'

const App: React.FC = () => {
  return (
    <div>
      <TextField text="hello" handleChange={(e) => e.preventDefault()} />
      <Counter>
        {(count, setCount) => (
          <div>
            {count}
            <button onClick={() => setCount(count + 1)}>+</button>
          </div>
        )}
      </Counter>
    </div>
  )
}

export default App
