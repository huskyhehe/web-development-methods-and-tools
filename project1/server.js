const express = require("express");
const app = express();
const PORT = 3000;

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const { v4: uuidv4 } = require("uuid");
const uid = uuidv4();

const game = require("./game");
const gameWeb = require("./game-web");

app.use(express.static("./public"));

app.use(express.urlencoded( {extended: false }));

const sessions = {};

function validateSid(sid) {
    return (!sid || !sessions[sid])? "Invalid session." : "";
}


// home
app.get("/", (req, res) => {
    // check sid
    const sid = req.cookies.sid;
    if (!sid || !sessions[sid]) {
        res.send(gameWeb.loginPage(""));
        return;
    }
    const { username } = sessions[sid];
    game.getUserData(username);
    res.send(gameWeb.dataPage(username, ""));
});

// login
app.post("/login", (req, res) => {
    // check username
    const username = req.body.username.trim();
    const usernameErrorMsg = game.validateUsername(username);
    if (usernameErrorMsg) {
        res.status(401).send(gameWeb.loginPage(usernameErrorMsg));
        return;
    }
    const sid = uuidv4();
    sessions[sid] = { username };
    res.cookie("sid", sid);
    res.redirect("/");
});

// guess
app.post("/guess", (req, res) => {
    // check sid
    const sid = req.cookies.sid;
    const sessionErrorMsg = validateSid(sid);
    if (sessionErrorMsg) {
        res.status(403).send(gameWeb.loginPage(sessionErrorMsg));
        return;
    }
    const { username } = sessions[sid];
    // check guess word
    const guessWord = req.body.word.trim().toLowerCase();
    const warningMsg = game.validateGuessWord(username, guessWord);
    if (warningMsg) {
        res.send(gameWeb.dataPage(username, warningMsg));
        return;
    }
    game.compareLetters(username, guessWord);
    res.redirect("/");
});

// new game
app.post("/new-game", (req, res) => {
    // check sid
    const sid = req.cookies.sid;
    const sessionErrorMsg = validateSid(sid);
    if (sessionErrorMsg) {
        res.status(403).send(gameWeb.loginPage(sessionErrorMsg));
        return;
    }
    const { username } = sessions[sid];
    game.restartGame(username);
    res.redirect("/");
});

// logout 
app.post("/logout", (req, res) => {
    const sid = req.cookies.sid;
    delete sessions[sid];
    res.clearCookie("sid");
    res.redirect("/");
});


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

