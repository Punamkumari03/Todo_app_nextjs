import React from 'react'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'

const Todolist = (props) => {
  return (
    <>
        <ul>
            {props.todos.map((todo)=>(
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onDelete={props.onDelete}
                    onToggle={props.onToggle}
                />
            ))}
        </ul>
    </>
  )
}

export default Todolist

