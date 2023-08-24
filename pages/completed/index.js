import { MongoClient } from "mongodb";
import React, { Fragment, useEffect, useState } from "react";
import Header from "../../compenent/Header";
import TodoItem from "../../compenent/TodoItem";



const CompletedTodos = (props) => {
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    const completedTodosList = props.todoData.filter((todo) => todo.isCompleted);
    setCompletedTodos(completedTodosList);
  }, []);

  const deleteTodoHandler = async (id) => {
    
    const updatedData = completedTodos.filter((todo) => todo.id !== id);
    setCompletedTodos(updatedData);

    const response = await fetch("/api/delete-todo", {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const completedTodosListElement = completedTodos.reverse().map((todo) => (
    <TodoItem
      key={todo.id}
      id={todo.id}
      isCompleted={todo.isCompleted}
      title={todo.title} 
      onDelete={deleteTodoHandler}
      type="completedTodo"
     />
  ));
  return (
    <Fragment>
      <Header />
      <div>
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <h1 className="text-4xl border-b-2 border-[#766186] mb-10">
            Completed Todos
          </h1>
          <ul>{completedTodosListElement}</ul>
        </div>
      </div>
    </Fragment>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
   "mongodb+srv://punamgupta250602:punam123@cluster0.vicanvy.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const todoCollection = db.collection("todolist");
  const result = await todoCollection.find().toArray();
  client.close();

  return {
    props: {
      todoData: result.reverse().map((todo) => ({
        title: todo.title,
        isCompleted: todo.isCompleted,
        id: todo._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default CompletedTodos;