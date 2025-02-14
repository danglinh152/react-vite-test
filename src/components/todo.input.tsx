import React, { useState } from "react";

interface Iprops {
  listTasks: string[];
  setListTasks: any;
}

const Todoinput = (props: Iprops) => {
  const { listTasks, setListTasks } = props;
  const [task, setTask] = useState<string>("");

  const handleInputTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setTask(inputValue);
  };

  const handleAddTask = () => {
    if (task !== "") {
      setListTasks([...listTasks, task]);
    }
    setTask("");
  };

  return (
    <div>
      <input
        type="text"
        name=""
        id=""
        value={task}
        onChange={handleInputTask}
      />
      <button onClick={handleAddTask}>Add to do</button>
    </div>
  );
};

export default Todoinput;
