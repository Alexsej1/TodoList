import React from "react";

function TodoFilter({ showOnlyUndone, onFilter }) {
  return (
    <div>
      <input type="checkbox" checked={showOnlyUndone} onChange={onFilter} />
      <span>Только невыполненные</span>
    </div>
  );
}

export default TodoFilter;
