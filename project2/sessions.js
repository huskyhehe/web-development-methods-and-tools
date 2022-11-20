const uuid = require("uuid").v4;

const sessions = {};

function addSession(username) {
    const sid = uuid();
    sessions[sid] = {
        username,
    };
    return sid;
}

function getSessions() {
    return sessions;
}

function getSessionUser(sid) {
    return sessions[sid]?.username;
}

function deleteSession(sid) {
    delete sessions[sid];
}

module.exports = {
    addSession,
    getSessions,
    deleteSession,
    getSessionUser,  
};