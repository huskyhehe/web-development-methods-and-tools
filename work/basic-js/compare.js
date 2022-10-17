"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */
  const wordFrequency = countFrequencyOfCharacter(word);
  const guessFrequency = countFrequencyOfCharacter(guess);

  let matchCount = 0;
  for (let char of Object.keys(guessFrequency)) {
    if (char in wordFrequency) {
      matchCount += Math.min(wordFrequency[char], guessFrequency[char]);
    };
  };
  return matchCount;
};

function countFrequencyOfCharacter(string) {
  let frequency = {};
  for (let char of string.toUpperCase()) {
    frequency[char] = frequency[char] + 1 || 1;
  };
  return frequency;
}
