const express = require('express');
const app = express();
const PORT = 3000;

const cats = ['Jorts', 'Jean', 'Nyancat' ];

app.use(express.static('./public'));

app.get('/cats', (req, res) => {

  setTimeout( () => {
    // res.send( JSON.stringify( cats ) );
    res.json( cats );

  }, 1000);

});

app.get('/dogs', (req, res) => {
  res.status(500).json( {
    error: "Too much drool",
  });

});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
