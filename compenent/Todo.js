import React, { useRef } from 'react'
import TodoItem from './TodoItem'

const Todo = (props) => {
    const inputRef = useRef()

    const todoListItem = props.todoData.map(todo=>(!todo.isCompleted &&  <TodoItem
        key={todo.id}
        id={todo.id}
        isCompleted={todo.isCompleted}
        title={todo.title} 
        onDelete={props.onDelete}
        type="todo"
       /> ))
  return (
    <>
    <h1>Todo List</h1>
      <input
        type="text"
      
        placeholder="Add a new task"
        ref={inputRef}
        
      />
      <button onClick={()=> props.onClick(inputRef.current.value)}>Add</button>
      <div>{todoListItem.length >0 ? <ul>{todoListItem}</ul> : <p>Please add todo items.</p>}</div>
  
    </>
  )
}

export default Todo
