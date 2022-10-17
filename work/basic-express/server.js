const express = require('express');
const app = express();
const PORT = 3000;

const chat = require('./chat'); // "chat" holds all the non-web logic for managing users/messages
const chatWeb = require('./chat-web'); // "chat-web" holds the templates for the generated HTML

app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.send(chatWeb.chatPage(chat));
});


// Below includes an example of pulling fields from a POST request body
app.post('/chat', express.urlencoded({ extended: false }), (req, res) => {
<<<<<<< HEAD
  const { sender, text } = req.body; 
  // Fill in here!
  if (text.trim()) {
    chat.addMessage({ sender, text });
  }
=======
  const { text } = req.body; // You'll need to add something!
  // Fill in here!
>>>>>>> 5d2926b2a08b21d37292d24fb02f345335597b43
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
