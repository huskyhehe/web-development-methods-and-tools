import { SERVER, CLIENT } from "./constants";
import state, {
    waitOnLogin,
    login,
    logout, 
    setOnlineUsers,
    setMessages,
    setError,
} from "./state";
import {
    fetchSession,
    fetchMessages, 
    fetchOnlineUsers, 
} from "./services";
import {
    addAbilityToLogin,
    addAbilityToLogout,
    addAbilityToSendMessage,
    scrollToLatestMessage,
} from "./listeners";
import { 
    isMessagesDataNewest, 
    isOnlineUsersDataNewest,
} from "./checkers";
import { 
    render,
    rerenderMessages,
    rerenderOnlineUsers,    
} from "./render";


const appEl = document.querySelector("#app");

waitAndCheckForSession();
addAbilityToLogin({ state, appEl });
addAbilityToSendMessage({ state, appEl });
addAbilityToLogout({ state, appEl });
pollNewestChatData();


function waitAndCheckForSession() {
    waitOnLogin();
    render({state, appEl});
    setTimeout(() => checkForSession(), 1500);
}

function pollNewestChatData() {
    setInterval(checkForUpdates, 5000);
}


function checkForSession() {
    fetchSession()
    .then( session => {
        login(session.username);
        render({ state, appEl });   
        return fetchMessages();
    })
    .catch( err => {
        if( err?.error === SERVER.AUTH_MISSING ) {
            return Promise.reject({ error: CLIENT.NO_SESSION })
        }
        return Promise.reject(err);
    })
    .then( messages => {
        setMessages(messages);
        return fetchOnlineUsers();
    })
    .then( onlineUsers => {
        setOnlineUsers(onlineUsers);
        render({ state, appEl });
        scrollToLatestMessage();
    })
    .catch( err => {
        if( err?.error == CLIENT.NO_SESSION ) {
            logout(); 
            render({ state, appEl });
            return;
        }
        setError(err?.error || "ERROR"); 
        render({ state, appEl });
    });
}

function checkForUpdates() {
    // fetch updates only user is loggedIn and chat is loaded
    if (state.isLoggedIn && !state.isChatPending) {
        fetchMessages()
        .then( messages => {
            // rerender messagesEl only when new message added
            if (!isMessagesDataNewest(messages, state.messages)) {
                setMessages(messages);
                rerenderMessages(state);
                scrollToLatestMessage();
            }
            return fetchOnlineUsers();
        })
        .then( onlineUsers => {
            // rerender onlineUsersEl only when other user login or logout
            if (!isOnlineUsersDataNewest(onlineUsers, state.onlineUsers)) {
                setOnlineUsers(onlineUsers);
                rerenderOnlineUsers(state);
            }  
        })
        .catch( err => {
            setError(err?.error || "ERROR");
            render({state, appEl});
        });
    }  
}
