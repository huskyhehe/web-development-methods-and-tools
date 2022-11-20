export function render({ state, appEl }) {
    const html = `
        <main>
            ${generateStatusHtml(state)}
            ${generateLoginHtml(state)}
            ${generateContentHtml(state)}
        </main>
   `;
    appEl.innerHTML = html;
}

export function rerenderMessages(state) {
    const messagesEl = document.querySelector('.messages');
    if (messagesEl) {
        messagesEl.innerHTML = generateMessageListHtml(state);  
    }
}

export function rerenderOnlineUsers(state) {
    const usersEl = document.querySelector('.users');
    if (usersEl) {
        usersEl.innerHTML = generateOnlineUsernameListHtml(state);
    }
}

function generateStatusHtml(state) {
    if (!state.error) {
        return ``;
    }   
    return `<div class="status"><p>${state.error}</p></div>`;
}

function generateLoginHtml(state) {
    if (state.isLoggedIn) {
        return ``;
    };

    if(state.isLoginPending) {
        return `
            <div class="login__waiting">Loading user...</div>
        `;
    }
    return `
        <div class="login">
            <h2>Login</h2>
            <form class="login__form" action="#/login">
                <input class="login__username" placeholder="Enter username" value="">
                <button class="login__button" type="submit">Login</button>
            </form>
        </div>
    `;
}

function generateContentHtml(state) {
    if (!state.isLoggedIn) {
        return ``;
    }
    if (state.isChatPending) {
        return `
            <div class="content__waiting">
                ${generateControlsHtml(state)}
                <div class="chat__waiting">Loading Chat...</div>
            </div>
        `;
    }
    return `
        <div class="content">
            <div class="users__container">
                <h3>Online Users</h3>
                <ul class="users">${generateOnlineUsernameListHtml(state)}</ul>
            </div>
            <div class=${!state.error? "messages__container" : "messages__container__with__status"}>
                ${generateControlsHtml(state)}
                <ul class="messages">${generateMessageListHtml(state)}</ul>
                <div class="send">${generateSendMessageHtml(state)}</div>
            <div>
        </div>
    `;
}

function generateControlsHtml(state) {
    return `
        <div class="controls">
            <p>Logged in as: <span>${state.username}</span></p>
            <button class="controls__logout">Logout</button>
        </div>
    `;
}

function generateOnlineUsernameListHtml(state) {   
    const loggedInUsernameListHtml = Object.keys(state.onlineUsers).map(username => {
        return `
            <li class="online__user">
                <span class="online__mark"></span><span class="username">${username}</span>
            </li>
        `;
    }).join('');
    return loggedInUsernameListHtml;
}

function generateMessageListHtml(state) {
    const messageListHtml = Object.values(state.messages).map(message => {
        return `
            <li class=${message.username === state.username? "user__message":"other__user__message"}>
                <p class="sender">${message.username}</p>
                <p class="text">${message.text}</p>
            </li>
        `;
    }).join('') || `<p class="no__message">No messages yet</p>`;
    return messageListHtml;
}

function generateSendMessageHtml(state) {
    return `
        <form class="send__form" action="#/send">
            <input class="send__text">
            <button type="submit" class="send__button">Send</button>
        </form>
    `;
}