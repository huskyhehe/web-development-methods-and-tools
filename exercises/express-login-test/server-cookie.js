const express = require('express');
const app = express();
const PORT = 3000;

// express "middleware", this time as an extra library
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// (skipping over other express stuff)
app.get('/', (req, res) => {
    const store = req.query.store;
    if(store) {
    res.cookie('saved', store);
    }
    const saw = req.cookies.saved;
    res.send(`<p>Request had cookie "saved": ${saw}</p>`);
});