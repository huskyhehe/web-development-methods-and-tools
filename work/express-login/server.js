const express = require('express');
const app = express();
const PORT = 3000;

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const { v4: uuidv4 } = require('uuid');
const uid = uuidv4();

const memo = require('./memo');
const memoWeb = require('./memo-web');

app.use(express.static('./public'));

app.use(express.urlencoded({ extended: false }));

const sessions = {};


app.get('/', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid || !sessions[sid]) {
        res.send(memoWeb.loginPage());
        return;
    };
    const { username } = sessions[sid];
    const word = memo.getWord(username);
    res.send(memoWeb.dataPage(username, word));
});

app.post('/login', (req, res) => {
    const username = req.body.username.trim();
    const errorMsg = memo.validateUsername(username);
    if (errorMsg) {
        res.status(401).send(memoWeb.errorPage(errorMsg));
        return;
    };
    const sid = uuidv4();
    sessions[sid] = { username };
    res.cookie('sid', sid);
    res.redirect('/');
});

app.post('/update', (req, res) => {
    const sid = req.cookies.sid;
    const { username } = sessions[sid];
    const newWord = req.body.word.trim();
    memo.updateWord(username, newWord);
    res.redirect('/');
});

app.post('/logout', (req, res) => {
    const sid = req.cookies.sid;
    delete sessions[sid];
    res.clearCookie('sid');
    res.redirect('/');
});


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));