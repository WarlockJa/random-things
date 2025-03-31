/*
    An example of useCallback calling memoised function reference despite
the fact that a new function reference is provided.
Explanation:
    useCallback only checks dependency array. When both function have the same
dependency array we can substitute function reference and it will be unnoticed
by useCallback.
    In this example each button click "Click A/B" randomly selects between called
functions A and B. However the actually called function returned by useCallback stays
the same, and only updates when count, which is a dependency array value, is updated.
*/

import { useCallback, useEffect, useRef, useState } from "react";

export default function UseCallbackSwap() {
  const [count, setCount] = useState<number>(0);

  const randomFnRef = useRef<() => void>(null);
  // because we're calling handle functions via useRef the count value is not updated with the state
  // for illustrative purposes replacing state value count with another useRef
  const countRef = useRef(0);

  // First render: handleClickA will be memoized
  const handleClickA = useCallback(() => {
    console.log(
      "Clicked A:",
      countRef.current,
      "CurrentRef: ",
      randomFnRef.current === handleClickA ? "Handle A" : " Handle B"
    );
    randomFnRef.current =
      Math.round(Math.random()) === 0 ? handleClickA : handleClickB;
  }, [count]);

  // Subsequent renders: Let's define a *different* function with the same dependency
  const handleClickB = useCallback(() => {
    console.log(
      "Clicked B:",
      countRef.current,
      "CurrentRef: ",
      randomFnRef.current === handleClickA ? "Handle A" : " Handle B"
    ); // Different console log
    randomFnRef.current =
      Math.round(Math.random()) === 0 ? handleClickA : handleClickB;
  }, [count]);

  useEffect(() => {
    randomFnRef.current =
      Math.round(Math.random()) === 0 ? handleClickA : handleClickB;
  }, []);

  useEffect(() => {
    countRef.current = count;
  }, [count]);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <button onClick={randomFnRef.current ?? handleClickA}>
        Click A/B (Memoized A)
      </button>
      <button onClick={increment}>Increment Count</button>
      <p>Count: {count}</p>
    </div>
  );
}
