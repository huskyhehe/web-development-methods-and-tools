const chatWeb = {
  chatPage: function(chat) {
    // Fill in/modify anything below!
    return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
<<<<<<< HEAD
          <link rel="stylesheet" href="chat.css">
=======
>>>>>>> 5d2926b2a08b21d37292d24fb02f345335597b43
        </head>
        <body>
          <div id="chat-app">
            ${chatWeb.getUserList(chat)}
            ${chatWeb.getMessageList(chat)}
            ${chatWeb.getOutgoing(chat)}
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function(chat) {
    return `<ol class="messages">` +
      // Fill in
      // Generate the HTML for the list of messages
<<<<<<< HEAD
      Object.values(chat.messages).map( message => `
        <li>
          <div class="message">
            <div class="sender-info">
              <img class="avatar" alt="avatar of ${message.sender}" src="images/avatar-${message.sender}.jpg"/>
              <span class=sender>${message.sender}</span>
            </div>
            <p class="message-text">${message.text}</p>
          </div>
        <li>
      `).join('') +
=======
>>>>>>> 5d2926b2a08b21d37292d24fb02f345335597b43
      `</ol>`;
  },
  getUserList: function(chat) {
    return `<ul class="users">` +
    Object.values(chat.users).map( user => `
      <li>
        <div class="user">
<<<<<<< HEAD
          <img class="avatar" alt="avatar of ${user}" src="images/avatar-${user}.jpg"/>
=======
>>>>>>> 5d2926b2a08b21d37292d24fb02f345335597b43
          <span class="username">${user}</span>
        </div>
      </li>
    `).join('') +
    `</ul>`;
  },
<<<<<<< HEAD
  getOutgoing: function(chat) {
    // Fill in
    // Generate the HTML for a form to send a message
    const currentSender = Object.keys(chat.users)[0];
    return `
      <div class="outgoing">
        <img class="avatar" alt="avatar of ${currentSender}" src="images/avatar-${currentSender}.jpg"/>
        <form action="/chat" method="post">
          <input class="sender" type="hidden" name="sender" value="${currentSender}"/>
          <input class="message-to-send" type="text" name="text" placeholder="Enter message to send" required/>
          <button class="send-button" type="submit">Send</button>
        </form>
      </div>
    `;
=======
  getOutgoing: function() {
    // Fill in
    // Generate the HTML for a form to send a message
>>>>>>> 5d2926b2a08b21d37292d24fb02f345335597b43
  }
};
module.exports = chatWeb;
