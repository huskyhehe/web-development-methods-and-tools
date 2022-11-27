import { SECRET_WORD } from "./constants";
const wordRegex = /^[A-Za-z]{5}$/;

export function generateGuessingResult(word) {
    if (!word.trim()) {
        return "Your guessing word cannot be blank.";
    }
    if (!word.trim().match(wordRegex)) {
        return `"${word}" is not a valid guessing word.`;
    }
    return compare(word.trim(), SECRET_WORD);
}

function compare(guessWord, secretWord) {
    if (isExactMatch(guessWord, secretWord)) {
        return `"${guessWord}" is the secret word!`;
    }
    const matchCount = getMatchCount(guessWord, secretWord);
    return `"${guessWord}" had ${matchCount} letter(s) in common with the secret word.`;
}

function isExactMatch(secret, guess) {
    return secret.toLowerCase() === guess.toLowerCase();
}

function getMatchCount(secret, guess) {
    function letterFrequencyOf(word) {
        const letterFrequency = {};
        for (let letter of word.toLowerCase()) {
            letterFrequency[letter] = letterFrequency[letter] + 1 || 1;
        }
        return letterFrequency;       
    }
    const secretFrequency = letterFrequencyOf(secret);
    const guessFrequency = letterFrequencyOf(guess);
    let matchCount = 0;
    for (let letter in guessFrequency) {
        const secretCount = secretFrequency[letter] || 0;
        const guessCount = guessFrequency[letter] || 0;
        matchCount += Math.min(secretCount, guessCount);
    }
    return matchCount;
}
