import React, { useState, useRef } from 'react'

interface Props {
  text: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  obj?: {
    f1: string
  }
}

export const TextField: React.FC<Props> = ({ text, handleChange }) => {
  const [count, setCount] = useState<number | null>(0)
  const inputRef = useRef<HTMLInputElement>()
  const divRef = useRef<HTMLDivElement>()

  return (
    <div ref={divRef}>
      {text}
      <input ref={inputRef} onChange={handleChange} />
    </div>
  )
}
