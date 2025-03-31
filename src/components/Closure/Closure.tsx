const counter = (function () {
  let privateCounter = 0;

  function changeBy(val: number) {
    privateCounter += val;
  }

  return {
    increment() {
      changeBy(1);
    },

    decrement() {
      changeBy(-1);
    },

    value() {
      return privateCounter;
    },
  };
})();

export default function Closure() {
  console.log("0: ", counter.value());
  // counter.increment();
  // counter.increment();
  // counter.increment();
  console.log("1: ", counter.value());
  // counter.decrement();
  console.log("2: ", counter.value());

  return (
    <div>
      <h1>Closure</h1>
      <div style={{ display: "flex" }}>
        <button onClick={() => counter.decrement()}>-</button>
        <p>{counter.value()}</p>
        <button onClick={() => counter.increment()}>+</button>
      </div>
    </div>
  );
}
