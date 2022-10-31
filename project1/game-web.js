const game = require("./game");

const gameWeb = {
    loginPage: function (errorMsg) {
        return `
            <!doctype html>
            <html>
                <head>
                    <title>Word Guessing Game</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="game.css">
                </head>
                <body>
                    <div class="game-app">
                        ${gameWeb.getErrorContent(errorMsg)}
                        <h1 class="login-title">Login</h1>
                        <form action="/login" method="post" class="login-form">
                            <input type="text" name="username" placeholder="Enter username" required/>
                            <button type="submit" class="login-btn">Login</button>
                        </form>
                    </div>
                </body>
            </html>        
        `;
    },
    getErrorContent: function (errorMsg) {
        return !errorMsg
            ? `` 
            : `
                <p class="error-content">
                    <span class="error-title">Error:</span>
                    <span>${errorMsg} Please retry login.</span>
                </p>
            `;
    },

    dataPage: function (username, warningMsg) {
        return `
            <!doctype html>
            <html>
                <head>
                    <title>Word Guessing Game</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="game.css">
                </head>
                <body>
                    <div class="game-app">
                        <h1 class="game-title">Guess the Secret Word</h1>
                        <p class="user-info">Logged in username: <span class="username">${username}</span></p>
                        <div class="game-content">
                            <div>
                                <h3>There is a secret word in the word list. Guess it out!</h3>
                                ${gameWeb.getWordsList(game.words)}
                                ${gameWeb.getGuessFormOrWinningNotice(username)}
                                ${gameWeb.getWarningContent(warningMsg)}
                                <div class="restart-logout-content">
                                    <form action="/new-game" method="POST">
                                        <button type="submit" class="restart-btn">Start New Game</button>
                                    </form>
                                    <form action="/logout" method="POST">
                                        <button type="submit" class="logout-btn">Logout</button>
                                    </form>
                                </div>
                            </div>
                            <div class="guess-history">
                                <h3>--- Guess History ---</h3>
                                ${gameWeb.getGuessHistoryList(username)}
                            </div>
                        </div>               
                </body>
            </html>        
        `;
    },
    getWordsList: function (words) {
        return `<ul class="words-list">` + 
            Object.values(words).map((word) => `
                <li>${word}</li>
            `).join("") +
            `</ul>`;
    },
    getGuessFormOrWinningNotice: function (username) {
        return game.users[username].isWinning
            ? `${gameWeb.getWinningNotice(username)}`
            : `
                <form action="/guess" method="post" class="guess=form">
                    <input type="text" name="word" placeholder="Enter the word you guess" required/>
                    <button type="submit" class="compare-btn">Compare</button>
                </form>
            `;
    },
    getWinningNotice: function (username) {
        const numberOfGuess = Object.keys(game.users[username].guessHistory).length + 1;
        return `
            <p class="win-notice">` + (
                numberOfGuess === 1
                ? `You got it right the first time!`
                : `You found it in ${numberOfGuess} attempts!`)
                + ` Start a new game if you enjoy.
            </p>
        `;
    },
    getWarningContent: function (warningMsg) {
        return !warningMsg
            ? ``
            : `
                <p class="warning-content">
                    <span class="warning-title">Warning:</span>
                    <span>${warningMsg} Please retry a word from the list.</span>
                </p>
            `;
    }, 
    getGuessHistoryList: function (username) {
        return `<ol class="history-wrapper">` + 
            Object.entries(game.users[username].guessHistory).map(([guessWord, matchCount]) => `
                <li>Your guess: <span class="guess-word">${guessWord}</span> -> matched count: <span class="match-count">${matchCount}</span></li>
            `).join("") + 
            `</ol>`;
    },
};

module.exports = gameWeb;