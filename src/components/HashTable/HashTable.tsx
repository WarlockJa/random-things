import { useState } from "react";
import getMurmurHash2 from "./lib/getMurmurHash2";
import "./hashtable.css";
import getLoadFactor from "./lib/getLoadFactor";
import resizeHashTable from "./lib/resizeHashTable";

// arbitrary seed value for hashing algorithm
const SEED = 42;

export default function HashTable() {
  // hash table state
  const [hashTable, setHashTable] = useState<string[][]>(
    Array.from({ length: 4 }, () => [])
  );
  // interface states
  const [entry, setEntry] = useState("");
  const [findEntry, setFindEntry] = useState("");

  function handleAddClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // creating copy of the existing hashTable to abide react rules
    let newHashTable = structuredClone(hashTable);

    // getting hash value and storing it in the hashTable
    const hash = getMurmurHash2(entry, SEED) % hashTable.length;
    newHashTable[hash].push(entry);

    // calculating loadFactor and incrementing hashtable if it reaches 70%
    const loadFactor = getLoadFactor(newHashTable);
    if (loadFactor > 0.7) {
      newHashTable = resizeHashTable(
        newHashTable,
        newHashTable.length * 2,
        SEED
      );
    }

    // saving result
    setHashTable(newHashTable);
    setEntry("");
  }

  function handleFindClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const hash = getMurmurHash2(findEntry, SEED) % hashTable.length;
    const result =
      hashTable[hash]?.find((entry) => entry === findEntry) ?? "Not Found";
    alert(result);
  }

  return (
    <div>
      <h1 className="header">
        Hash Table implementation using MurmurHash algorithm
      </h1>
      <div className="container">
        <form onSubmit={handleAddClick} className="container__form">
          <label htmlFor="newEntry" className="container__form__label">
            Add Entry
          </label>
          <input
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            id="newEntry"
            placeholder="New entry"
            type="text"
            max={50}
          />
          <button>Add</button>
        </form>

        <form onSubmit={handleFindClick} className="container__form">
          <label htmlFor="findEntry" className="container__form__label">
            Find Entry
          </label>
          <input
            id="findEntry"
            placeholder="Entry to find"
            type="text"
            max={50}
            value={findEntry}
            onChange={(e) => setFindEntry(e.target.value)}
          />
          <button>Find</button>
        </form>
      </div>

      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 300px)",
          justifyItems: "start",
        }}
      >
        {hashTable.map((entry, index) => (
          <li key={index}>
            {index}: {JSON.stringify(entry)}
          </li>
        ))}
      </ul>
    </div>
  );
}
