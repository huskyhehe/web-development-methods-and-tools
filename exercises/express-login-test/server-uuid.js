const express = require('express');
const app = express();
const PORT = 4000;

const { v4: uuidv4 } = require('uuid');
// same as `const uuidv4 = require('uuid').v4;`
const uid = uuidv4();

// UUID as session id in express
app.use(express.urlencoded({ extended: false }));
const sessions = {};


app.post('/session', (req,res) => {
    const username = req.body.username.trim();
    if(username === 'dog' || !username){
    // Give better errors than this!
    res.status(403).send('invalid username');
    return;
    }
    const sid = uuidv4();
    sessions[sid] = { username }; // Do you know why?
    res.cookie('sid', sid);
    res.redirect('/');
});

app.get('/users', (req,res) => {
    const sid = req.cookies.sid;
    if(!sid || !isValid(sid)) {
        res.clearCookie('sid');
        res.sendStatus(401);
        return;
    }
    const { username } = sessions[sid];
    // Do whatever here
});
    

app.listen(
    PORT,
    () => console.log(`http://localhost:${PORT}`)
);