const express = require('express');

const app = express();
const PORT = 4000;

app.use(express.static('./public'));

const cats = ['Jorts', 'Jean', 'Nyancat'];


app.get('/rats', (req, res) => {
    setTimeout( () => {
        res.send('you have rats!');
    }, 1000);
});
// const promise = fetch('/rats');
// promise.then( () => console.log('fetch complete') );

app.get('/dogs', (req, res) => {
    setTimeout( () => {
        res.send( JSON.stringify( {
            message: "you have dogs",
        }) );
    }, 1000);
});
// fetch('/dogs')
// .then( response => response.json() )
// .then( body => console.log(body));


app.get('/cats', (req, res) => {
    setTimeout( () => {
        res.json( cats );
    }, 1000);
});

app.get('/don', (req, res) => {
    res.status(500).json( {
        error: 'Too much drool'
    });
});


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
