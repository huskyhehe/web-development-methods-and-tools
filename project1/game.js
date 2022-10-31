const users = {};
const words = require("./words");

const regex = /^[A-Za-z0-9]*$/;

function initUserData(username) {
    function setSecretWord() {
        return words[Math.floor(Math.random() * words.length)];
    }

    users[username] = {
        secretWord: setSecretWord(),
        guessHistory: {},
        isWinning: false,
    }
    // print username and secret word when starting new game (for grading)
    console.log("New game starts! " + "[username]:" + username + "  [secret word]:" + users[username].secretWord);
}

function getUserData(username) {
    if (!(username in users)) {
        initUserData(username);
    }
    return users[username];
}

function restartGame(username) {
    initUserData(username);
}

function validateUsername(username) {
    if (!username) {
        return "Username must contain at least one letter or number.";
    }
    if (username == "dog") {
        return "Username must not be dog.";
    }
    if (!username.match(regex)) {
        return "Username must only contain letters and numbers.";
    }
    return "";
}

function validateGuessWord(username, guessWord) {
    if (!guessWord) {
        return "Your word cannot be blank.";
    }
    if (!words.includes(guessWord)) {
        return "This word is not in the list.";
    }
    if (guessWord in users[username].guessHistory) {
        return "You have already tried this word.";
    }
    return "";
}

function compareLetters(username, guessWord) {
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
        const secretFrequency = letterFrequencyOf(secretWord);
        const guessFrequency = letterFrequencyOf(guessWord);
        let matchCount = 0;
        for (let letter in guessFrequency) {
            const secretCount = secretFrequency[letter] || 0;
            const guessCount = guessFrequency[letter] || 0;
            matchCount += Math.min(secretCount, guessCount);
        }
        return matchCount;
    }

    const secretWord = users[username].secretWord;
    if (isExactMatch(secretWord, guessWord)) {
        users[username].isWinning = true;
        return;
    }
    users[username].guessHistory[guessWord] = getMatchCount(secretWord, guessWord);
}


const game = {
    users,
    words,
    initUserData,
    getUserData,
    restartGame,
    validateUsername,
    validateGuessWord,
    compareLetters,
};

module.exports = game;