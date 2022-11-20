import { MESSAGES } from "./constants";

const state = {
    username: "",
    isLoginPending: true, 
    isLoggedIn: false, 
    isChatPending: false,
    onlineUsers: {},
    messages: {},
    error: "",
};

export function waitOnLogin() {
    state.isLoginPending = true;
    state.isLoggedIn = false;
    state.username = "";
    state.onlineUsers = {};
    state.messages = {};
    state.error = "";
}

export function login(username) {
    state.username = username;
    state.isLoginPending = false;
    state.isLoggedIn = true;
    state.error = "";
}

export function logout() {
    state.username = "";
    state.isLoginPending = false;
    state.isLoggedIn = false;  
    state.error = "";
}

export function waitOnChat() {
    state.isChatPending = true;
    state.messages = {};
    state.error = "";
}

export function setMessages(messages) {
    state.isChatPending = false;
    state.messages = messages;
    state.error = "";
}

export function setOnlineUsers(onlineUsers) {
    state.isChatPending = false;
    state.onlineUsers = onlineUsers;
    state.error = "";
}

export function addMessage({id, text}) {
    state.messages[id] = text;
    state.error = "";
}

export function setError(error) {
    if (!error) {
        state.error = "";
        return;
    }
    state.error = MESSAGES[error] || MESSAGES.default;
}


export default state;