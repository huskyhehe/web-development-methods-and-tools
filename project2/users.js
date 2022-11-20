const sessions = require("./sessions");

const users = {};

function isValid(username) {
    let isValid = true;
    isValid = !!username && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
}

function getUserData(username) {
    return users[username];
}

function addUserData(username, userData) {
    users[username] = userData;
}

function getOnlineUsers() {
    const onlineUsers = {};
    const usernames = [];
    for ( let [id, user] of Object.entries(sessions.getSessions())) {
        if (!usernames.includes(user.username)) {
            delete onlineUsers[user.username];
        }
        onlineUsers[user.username] = id;
        usernames.push(user.username);
    }
    return onlineUsers;
}


module.exports = {
    isValid,
    getUserData,
    addUserData,
    getOnlineUsers,
};