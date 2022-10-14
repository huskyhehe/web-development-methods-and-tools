"use strict";
(function() {
    const messagesEl = document.querySelector('.messages');
    const messageInputEl = document.querySelector('.message-to-send');
    const submitEl = document.querySelector('.send-button');

    messageInputEl.addEventListener("input", (e) => {  
        submitEl.disabled = !e.target.value;
    });

    messagesEl.scrollTop = messagesEl.scrollHeight;
})();