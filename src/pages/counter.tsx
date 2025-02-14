import { useState } from "react";

const Counter = () => {
  const [current, setCurrent] = useState<number>(1);

  const setCount = () => {
    setCurrent(current + 1);
  };
  return (
    <div>
      <div>current: {current}</div>
      <button onClick={setCount}>Count</button>
    </div>
  );
};

export default Counter;
