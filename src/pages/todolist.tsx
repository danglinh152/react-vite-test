import React, { useState } from "react";
import Todoinput from "../components/todo.input";

const Todolist: React.FC = () => {
  const [listTasks, setListTasks] = useState<string[]>([]);

  const clearTask = (index: number) => {
    setListTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks.splice(index, 1);
      return newTasks;
    });
  };

  return (
    <div>
      <Todoinput listTasks={listTasks} setListTasks={setListTasks} />
      <h2>Your To-Do List</h2>
      {listTasks.map((item, index) => (
        <div key={index}>
          <div>{item}</div>
          <button onClick={() => clearTask(index)}> X </button>
        </div>
      ))}
    </div>
  );
};

export default Todolist;
