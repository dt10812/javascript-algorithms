const DEFAULT_BASE = 17;

export default class SimplePolynomialHash {
  /**
   * @param {number} [base] - Base number that is used to create the polynomial.
   */
  constructor(base = DEFAULT_BASE) {
    if (!Number.isInteger(base) || base <= 0) {
      throw new Error('Base must be a positive integer.');
    }
    this.base = base;
  }

  /**
   * Function that creates hash representation of the word.
   *
   * Time complexity: O(word.length).
   *
   * @assumption: This version of the function doesn't use modulo operator.
   * Thus it may produce number overflows by generating numbers that are
   * bigger than Number.MAX_SAFE_INTEGER. This function is mentioned here
   * for simplicity and LEARNING reasons.
   *
   * @param {string} word - String that needs to be hashed.
   * @return {number}
   */
  hash(word) {
    if (typeof word !== 'string') {
      throw new TypeError('Input must be a string.');
    }

    let hash = 0;
    const chars = Array.from(word); // Handles Unicode and emoji correctly

    for (let i = 0; i < chars.length; i++) {
      const charCode = chars[i].codePointAt(0);
      hash += charCode * (this.base ** i);
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
   * @assumption: This function doesn't use modulo operator and thus is not safe since
   * it may deal with numbers that are bigger than Number.MAX_SAFE_INTEGER. This
   * function is mentioned here for simplicity and LEARNING reasons.
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
      Array.from(prevWord).length !== Array.from(newWord).length
    ) {
      throw new Error('Invalid input: ensure hash is a number and both words are strings of equal length.');
    }

    let hash = prevHash;

    const prevChars = Array.from(prevWord);
    const newChars = Array.from(newWord);

    const prevValue = prevChars[0].codePointAt(0);
    const newValue = newChars[newChars.length - 1].codePointAt(0);

    // Remove contribution of the first character
    hash -= prevValue;

    // Shift all characters one position to the left
    hash /= this.base;

    // Add contribution of the new character at the end
    hash += newValue * (this.base ** (newChars.length - 1));

    return hash;
  }
}
