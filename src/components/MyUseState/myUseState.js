const state = [];
let stateIndex = 0;

function useState(initState) {
  let pair = state[stateIndex];
  if (pair) {
    stateIndex++;
    return pair;
  }

  pair = [initState, setState];
  function setState(value) {
    console.log(state);
    pair[0] = value;
    updateDOM();
  }

  state[stateIndex] = pair;
  stateIndex++;
  return pair;
}

function MyUseState() {
  const [counter, setCounter] = useState(0);

  function handleIncClick() {
    setCounter(counter + 1);
  }

  function handleDecClick() {
    setCounter(counter - 1);
  }

  return {
    value: counter,
    onIncClick: handleIncClick,
    onDecClick: handleDecClick,
  };
}

const increment = document.getElementById("increment");
const decrement = document.getElementById("decrement");
const counter = document.getElementById("counter");

function updateDOM() {
  const { value, onDecClick, onIncClick } = MyUseState();

  increment.onclick = onIncClick;
  decrement.onclick = onDecClick;
  counter.textContent = value.toString();

  stateIndex = 0;
}

updateDOM();
