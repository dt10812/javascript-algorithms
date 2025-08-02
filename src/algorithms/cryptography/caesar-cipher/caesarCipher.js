// Create alphabet array: ['a', 'b', 'c', ..., 'z'].
const englishAlphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

/**
 * Generates a cipher map out of the alphabet.
 * Example with a shift 3: {'a': 'd', 'b': 'e', 'c': 'f', ...}
 *
 * @param {string[]} alphabet - i.e. ['a', 'b', 'c', ... , 'z']
 * @param {number} shift - i.e. 3
 * @return {Object} - i.e. {'a': 'd', 'b': 'e', 'c': 'f', ..., 'z': 'c'}
 */
const getCipherMap = (alphabet, shift) => {
  const charsMap = {};
  const len = alphabet.length;

  for (let i = 0; i < len; i++) {
    // Making the shift to be cyclic (i.e. with a shift of 1 - 'z' would be mapped to 'a').
    let encryptedCharIndex = (i + shift) % len;
    // Support negative shifts for creating a map for decryption
    // (i.e. with shift -1 - 'a' would be mapped to 'z').
    if (encryptedCharIndex < 0) {
      encryptedCharIndex += len;
    }
    charsMap[alphabet[i]] = alphabet[encryptedCharIndex];
  }

  return charsMap;
};

/**
 * Encrypts a string using Caesar cipher logic.
 * Supports Unicode characters and emojis by allowing custom alphabets.
 *
 * @param {string} str
 * @param {number} shift
 * @param {string[]} alphabet
 * @param {boolean} preserveCase - Optional flag to preserve original casing.
 * @return {string}
 */
export const caesarCipherEncrypt = (
  str,
  shift,
  alphabet = englishAlphabet,
  preserveCase = false
) => {
  // Create a cipher map:
  const cipherMap = getCipherMap(alphabet, shift);

  return Array.from(str).map((char) => {
    const lowerChar = char.toLowerCase();
    const mappedChar = cipherMap[lowerChar] || cipherMap[char] || char;

    // Preserve case if requested and applicable
    if (preserveCase && alphabet.includes(char)) {
      return char === char.toUpperCase() ? mappedChar.toUpperCase() : mappedChar;
    }

    return mappedChar;
  }).join('');
};

/**
 * Decrypts a string using Caesar cipher logic.
 * Supports Unicode characters and emojis by allowing custom alphabets.
 *
 * @param {string} str
 * @param {number} shift
 * @param {string[]} alphabet
 * @param {boolean} preserveCase - Optional flag to preserve original casing.
 * @return {string}
 */
export const caesarCipherDecrypt = (
  str,
  shift,
  alphabet = englishAlphabet,
  preserveCase = false
) => {
  // Create a cipher map:
  const cipherMap = getCipherMap(alphabet, -shift);

  return Array.from(str).map((char) => {
    const lowerChar = char.toLowerCase();
    const mappedChar = cipherMap[lowerChar] || cipherMap[char] || char;

    // Preserve case if requested and applicable
    if (preserveCase && alphabet.includes(char)) {
      return char === char.toUpperCase() ? mappedChar.toUpperCase() : mappedChar;
    }

    return mappedChar;
  }).join('');
};
