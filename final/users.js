const posts = require("./posts");

const users = {
    "danny": posts,
    "huskyhehe": posts,
};

function isValid(username) {
    let isValid = true;
    isValid = !!username && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
}

function containsUser(name) {
    return Object.keys(users).some(username => username === name);
}

function getUserData(username) {
    return users[username];
}

function addUserData(username, userData) {
    users[username] = userData;
}

module.exports = {
    isValid,
    containsUser,
    getUserData,
    addUserData,
};