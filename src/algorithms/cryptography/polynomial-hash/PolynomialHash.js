const DEFAULT_BASE = 37;
const DEFAULT_MODULUS = 101;

export default class PolynomialHash {
  /**
   * @param {number} [base] - Base number that is used to create the polynomial.
   * @param {number} [modulus] - Modulus number that keeps the hash from overflowing.
   */
  constructor({ base = DEFAULT_BASE, modulus = DEFAULT_MODULUS } = {}) {
    if (!Number.isInteger(base) || base <= 0) {
      throw new Error('Base must be a positive integer.');
    }
    if (!Number.isInteger(modulus) || modulus <= 0) {
      throw new Error('Modulus must be a positive integer.');
    }

    this.base = base;
    this.modulus = modulus;
  }

  /**
   * Function that creates hash representation of the word.
   *
   * Time complexity: O(word.length).
   *
   * @param {string} word - String that needs to be hashed.
   * @return {number}
   */
  hash(word) {
    if (typeof word !== 'string') {
      throw new TypeError('Input must be a string.');
    }

    const charCodes = Array.from(word).map((char) => this.charToNumber(char));

    let hash = 0;
    for (let charIndex = 0; charIndex < charCodes.length; charIndex += 1) {
      hash = (hash * this.base + charCodes[charIndex]) % this.modulus;
    }

    return hash;
  }

  /**
   * Function that creates hash representation of the word
   * based on previous word (shifted by one character left) hash value.
   *
   * Recalculates the hash representation of a word so that it isn't
   * necessary to traverse the whole word again.
   *
   * Time complexity: O(1).
   *
   * @param {number} prevHash
   * @param {string} prevWord
   * @param {string} newWord
   * @return {number}
   */
  roll(prevHash, prevWord, newWord) {
    if (
      typeof prevHash !== 'number' ||
      typeof prevWord !== 'string' ||
      typeof newWord !== 'string' ||
      prevWord.length !== newWord.length
    ) {
      throw new Error('Invalid input: ensure hash is a number and both words are strings of equal length.');
    }

    let hash = prevHash;

    const prevValue = this.charToNumber(prevWord[0]);
    const newValue = this.charToNumber(newWord[newWord.length - 1]);

    // Compute base^(length - 1) % modulus
    let prevValueMultiplier = 1;
    for (let i = 1; i < prevWord.length; i += 1) {
      prevValueMultiplier = (prevValueMultiplier * this.base) % this.modulus;
    }

    // Remove the contribution of the first character of the previous word
    hash = (hash + this.modulus - (prevValue * prevValueMultiplier) % this.modulus) % this.modulus;

    // Add the new character and reapply modulus
    hash = (hash * this.base + newValue) % this.modulus;

    return hash;
  }

  /**
   * Converts char to number.
   *
   * @param {string} char
   * @return {number}
   */
  charToNumber(char) {
    if (typeof char !== 'string' || char.length === 0) {
      throw new TypeError('Input must be a non-empty string character.');
    }

    // Use full Unicode code point for proper emoji and surrogate pair support
    return char.codePointAt(0);
  }
}
