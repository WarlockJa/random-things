// Overload signatures
function add(a: number, b: number): number;
function add(a: number): (c: number) => number;

function add(a: number, b?: number) {
  if (b) return a + b;
  return function (c: number) {
    return a + c;
  };
}

export default function OverloadSignature() {
  console.log("1: ", add(0, 1));
  console.log("2: ", add(1, 1));
  console.log("3: ", add(1)(0));
  console.log("4: ", add(1));

  const fn = add(1);

  return (
    <div>
      <h1>OverloadSignature</h1>
      <div>1: {add(1, 0).toString()}</div>
      <div>2: {add(1, 1).toString()}</div>
      <div>3: {add(1)(1).toString()}</div>
      <div>4: {fn(1).toString()}</div>
    </div>
  );
}
