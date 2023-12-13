import React from "react";
import "./Todo.css";

function Todo(props) {
  const { id, name, done, createdAt, onDone, onDelete } = props;

  return (
    <div className={`todo ${done ? "done" : ""}`}>
      <div>
        <input
          className="checked"
          type="checkbox"
          checked={done}
          onChange={() => onDone(id)}
        />
        <span>{name}</span>
      </div>

      <div className="del-dat">
        <div className="createdAt">{createdAt}</div>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  );
}

export default React.memo(Todo);
