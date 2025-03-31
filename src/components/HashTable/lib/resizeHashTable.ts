import getMurmurHash2 from "./getMurmurHash2";

export default function resizeHashTable(
  hashTable: string[][],
  size: number,
  seed: number
): string[][] {
  const newHashTable: string[][] = Array.from({ length: size }, () => []);
  for (const entry of hashTable) {
    entry.forEach((item) => {
      const hash = getMurmurHash2(item, seed) % newHashTable.length;
      newHashTable[hash].push(item);
    });
  }
  return newHashTable;
}
