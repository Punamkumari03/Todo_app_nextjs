import { useState } from "react";
import TodoForm from "../compenent/TodoForm";
import Head from 'next/head'
import Todolist from "../compenent/Todolist";
function Home(props) {
    const[todos,setTodos] = useState([])
    const addTodo =()=>{
        const newTodo = {id:Date.now(),text:props.text,isCompleted:false}
        setTodos([...todos,newTodo])
}
const deleteTodo =(id) =>{
    const updatedTodos = todos.filter((todo)=> todo.id!==id);
    setTodos(updatedTodos)
}
const toggleTodo =(id) =>{
    const updatedTodos = todos.map((todo)=> todo.id == id?{...todo,isCompleted: !todo.isCompleted}:todo)
    setTodos(updatedTodos)
}
  return (
    <>
      <Head>
<title>Todo App</title>
      </Head>
      <h1>Todo App</h1>
      <TodoForm onAdd={addTodo}/>
      <Todolist todos={todos} onDelete={deleteTodo} onToggle={toggleTodo}/>
    </>
  );
}

export default Home;
