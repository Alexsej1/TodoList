import React, { useCallback, useState, useMemo } from "react";
import "./Todo.css";
import Todo from "./Todo.jsx";
import TodoFilter from "./TodoFilter";
import TodoSort from "./TodoSort";
import useInputValue from "../hooks/use-input-value";

function AppContainer() {
  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const [todos, setTodos] = useState([]);
  const [name, handleSetName, setName] = useInputValue();
  const [error, setError] = useState("");
  const [currentId, setCurrentId] = useState(1);

  const handleAddTodo = useCallback(() => {
    if (name.trim() === "") {
      setError("Строка не может быть пустой");
      return;
    }
    const createdAtSeconds = Math.floor(Date.now() / 1000);
    const todo = {
      id: currentId,
      name: name.trim(),
      done: false,
      createdAtSeconds: createdAtSeconds,
      createdAt: new Date().toLocaleString("ru-RU", options)
    };
    setCurrentId(currentId + 1);
    setName("");
    setTodos((prevTodos) => [...prevTodos, todo]);
    setError("");
  }, [currentId, name]);

  const [sortAlphabetically, setSortAlphabetically] = useState(false);
  const [sortNewestFirst, setSortNewestFirst] = useState(true);

  const handleSortTodosByName = useCallback(() => {
    setSortAlphabetically(!sortAlphabetically);
    setSortNewestFirst(false);
  }, [sortAlphabetically]);

  const handleSortTodosByCreatedAt = useCallback((newestFirst) => {
    setSortAlphabetically(false);
    setSortNewestFirst(newestFirst);
  }, []);

  const sortedTodos = useMemo(() => {
    let sortedArray = [...todos];
    if (sortAlphabetically) {
      sortedArray.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    } else {
      sortedArray.sort((a, b) => {
        if (sortNewestFirst) {
          return b.createdAtSeconds - a.createdAtSeconds;
        } else {
          return a.createdAtSeconds - b.createdAtSeconds;
        }
      });
    }
    return sortedArray;
  }, [todos, sortAlphabetically, sortNewestFirst]);

  const handleSetDone = useCallback((id) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }, []);

  const handleDeleteTodo = useCallback((id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const [showOnlyUndone, setShowOnlyUndone] = useState(false);

  const handleFilter = useCallback(() => {
    setShowOnlyUndone(!showOnlyUndone);
  }, [showOnlyUndone]);

  const filteredTodos = showOnlyUndone
    ? sortedTodos.filter((todo) => !todo.done)
    : sortedTodos;

  const doneCount = useMemo(() => todos.filter((todo) => todo.done).length, [
    todos
  ]);

  return (
    <div className="wrapper">
      <div className="filterTable">
        <TodoFilter showOnlyUndone={showOnlyUndone} onFilter={handleFilter} />

        <TodoSort
          sortAlphabetically={sortAlphabetically}
          sortNewestFirst={sortNewestFirst}
          sortTodosByName={handleSortTodosByName}
          sortTodosByCreatedAt={handleSortTodosByCreatedAt}
        />
      </div>
      <div className="TodoList">
        <h1>TodoList</h1>
        <div className="TodoForm">
          <input
            onKeyPress={handleKeyPress}
            value={name}
            onChange={handleSetName}
            placeholder="Добавить задание..."
          />
          <button onClick={handleAddTodo}>Save</button>
          {error && <p className="error">{error}</p>}
        </div>

        <div className="doneTodos">
          Выполнено: {doneCount} / {todos.length}
        </div>
        {filteredTodos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            name={todo.name}
            done={todo.done}
            createdAt={todo.createdAt}
            onDone={handleSetDone}
            onDelete={handleDeleteTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default AppContainer;
