export default function getLoadFactor(hashTable: string[][]): number {
  let loadFactor = 0;
  for (const entry of hashTable) {
    loadFactor += entry.length;
  }

  return loadFactor / hashTable.length;
}
