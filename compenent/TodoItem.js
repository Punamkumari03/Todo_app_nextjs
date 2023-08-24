import React from "react";

const TodoItem = (props) => {
  // const {id,text,isCompleted} = todo;
  return (
    <>
      <li>
        <input
          type="checkbox"
          checked={props.isCompleted}
          onChange={() => {
            props.onToggle(props.id);
          }}
        ></input>
        <span className={props.isCompleted ? "completed" : ""}>
          {props.text}
        </span>
        <button onClick={() => props.onDelete(props.id)}>Delete</button>
      </li>
    </>
  );
};

export default TodoItem;
