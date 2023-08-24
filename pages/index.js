import { MongoClient } from "mongodb";
import { Fragment, useEffect, useState } from "react";
import Todo from "../compenent/Todo";
import Header from "../compenent/Header";



export default function Home(props) {
  const [todos, setTodos] = useState([]);

  

  const addTodoHandler = async (todoData) => {
    const data = { title: todoData, isCompleted: false };

    const response = await fetch('/api/add-todo', {
      method: "POST",
      body: JSON.stringify({ title: todoData, isCompleted: false }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await response.json();
    setTodos((prev) => [{ ...data, id: resData._id }, ...prev]);
  };

  useEffect(() => {
    setTodos(props.todoData);
  }, []);

  const deleteTodoHandler = async (id) => {
    const updatedData = todos.filter((todo) => todo.id !== id);
    setTodos(updatedData);

    const response = await fetch('/api/delete-todo', {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
  };

  return (
    <Fragment>
      <Header />

      <main>
        <Todo
          onClick={addTodoHandler}
          todoData={todos}
          onDelete={deleteTodoHandler}
        />
      </main>
    </Fragment>
  );
}

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
