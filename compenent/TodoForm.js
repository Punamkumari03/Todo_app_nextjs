import React, { useRef, useState } from 'react'

const TodoForm = (props) => {
    const[text,setText] = useState('')
    const inputRef = useRef();
    const handleSubmit =(e)=>{
        e.preventDefault()
        const enteredInputRef = inputRef.current.value
        props.onAdd(text)
        setText('');
       
    }
  return (
    <div>
       <form onSubmit={handleSubmit}>
      <input
        type="text"
      
        placeholder="Add a new task"
        ref={inputRef}
        onChange={(e)=> setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
    </div>
  )
}

export default TodoForm
