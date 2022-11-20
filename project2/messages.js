const uuid = require('uuid').v4;

const messages = {};

function getMessages() {
    return messages;
}

function addMessage(username, text) {
    const id = uuid();
    messages[id] = {
        id,
        username,
        text,
    };
    return id;
}

function getMessage(id) {
    return messages[id];
}


module.exports = {
    getMessages,
    addMessage,
    getMessage,
};