/*
implementation of the MurmurHash2 algorithm
*/

// selected via extensive empirical testing, these constants ensure good distribution,
// a strong avalanche effect, and efficient computation. The specific
// values were found to work well in practice for a wide range of input data.

// This is a magic multiplier constant used in the hash function
const M = 0x5bd1e995;
// This is a right shift constant.
const R = 24;

export default function getMurmurHash2(str: string, seed: number) {
  let hash = seed ^ str.length;
  let index = 0;

  while (index < str.length) {
    let current = str.charCodeAt(index++);

    // Multiplies current by the magic constant M. Math.imul performs 32-bit integer multiplication
    current = Math.imul(current, M);
    // XORs current with the result of a right bit shift of current by R positions
    current ^= current >>> R;
    current = Math.imul(current, M);

    hash = Math.imul(hash, M);
    hash ^= current;
  }

  hash ^= hash >>> 13;
  hash = Math.imul(hash, M);
  hash ^= hash >>> 15;

  return hash >>> 0; // Ensure the result is unsigned
}
