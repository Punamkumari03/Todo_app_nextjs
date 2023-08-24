import React, { useEffect, useState } from "react";

const TodoItem = (props) => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(props.isCompleted);
  }, []);

  const updateTodoHandler = async () => {
    setDone(true);
    const response = await fetch("/api/update-todo", {
      method: "POST",
      body: JSON.stringify({
        title: props.title,
        _id: props.id,
        isCompleted: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };
  const deleteTodoHandler = () => {
    props.onDelete(props.id);
  };

  return (
    <>
      <li id={props.id}>
        {done ? <p>{props.title}</p> : <p>{props.title}</p>}

        {props.type === "todo" && (
          <button onClick={updateTodoHandler} disabled={done}>
            Done
          </button>
        )}
        <button onClick={deleteTodoHandler}>Remove</button>
      </li>
    </>
  );
};

export default TodoItem;
