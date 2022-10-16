const express = require('express');
const app = express();

app.use(express.static('./public'));

app.listen(3000, () => {
    console.log('listening on http://localhost:3000');
});

app.get('/dynamic.html', (request, response) => {
    response.send('This is not an actual file');
});

app.get('/dynamic.html', (req, res) => {
    response.send('This is not an actual file');
});

app.get('/cats/:name', (req, res) => { 
    console.log(req.params)
});

const cats = {
    
}


