// Simple XSS Demo
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    const name = req.query.name;
    res.send(`<p>Hello ${name}</p>`);
});

app.listen(
    PORT,
    () => console.log(`http://localhost:${PORT}`)
);

/**
 * Run "node server-xss.js"
 * visit http://localhost:3000/?name=He%20Zhou
 * It shows "Hello He Zhou"
 * 
 * visit http://localhost:3000/?name=%3Cimg+src=%27%27+onerror=%22alert(%27pwned%27)%22%3E
 * It pops a alert: "pwned"
 */


/**
 * Why is XSS Bad?
 * They can...
 * inject ads (incl. popups)
 * redirect page
 * steal processor time
 *      - Bitcoin mining?
 * scrape data off the page and send it elsewhere
 *      - Including private data/passwords
 * alter any data on the page
 * perform actions on the page
 *      - Enter data
 *      - Click buttons
 */
