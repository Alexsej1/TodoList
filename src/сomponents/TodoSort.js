import React from "react";

function TodoSort({
  sortAlphabetically,
  sortNewestFirst,
  sortTodosByName,
  sortTodosByCreatedAt
}) {
  return (
    <div className="filter">
      <label>
        <input
          type="radio"
          checked={sortAlphabetically}
          onChange={sortTodosByName}
        />
        <img src="/img/arrow-up-a-z-solid.svg" className="icon" />
        Сортировать по алфавиту
      </label>

      <label>
        <input
          type="radio"
          checked={!sortAlphabetically && !sortNewestFirst}
          onChange={() => sortTodosByCreatedAt(false)}
        />
        <img src="/img/arrow-up-9-1-solid.svg" className="icon" />
        Сначала старые
      </label>

      <label>
        <input
          type="radio"
          checked={!sortAlphabetically && sortNewestFirst}
          onChange={() => sortTodosByCreatedAt(true)}
        />
        <img src="/img/arrow-up-1-9-solid.svg" className="icon" />
        Сначала новые
      </label>
    </div>
  );
}

export default TodoSort;
