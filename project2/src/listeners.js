import { 
    fetchLogin, 
    fetchLogout,
    fetchOnlineUsers,
    fetchAddMessage,
} from "./services";
import { 
    login, 
    logout, 
    waitOnChat, 
    setOnlineUsers, 
    setMessages, 
    addMessage,
    setError,
} from "./state";
import { render } from "./render";
import { CLIENT } from "./constants";


export function addAbilityToLogin({ state, appEl }) {
    appEl.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!e.target.classList.contains("login__form")) {
            return;
        }

        const username = appEl.querySelector(".login__username").value;
        
        fetchLogin(username)
        .then( messages => {
            login(username);
            waitOnChat();
            render({ state, appEl });
            setMessages(messages);    
            return fetchOnlineUsers();  
        })
        .then( onlineUsers => {
            setOnlineUsers(onlineUsers);
            setTimeout(() => {
                render({ state, appEl });
                scrollToLatestMessage();
            }, 1500) 
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
    });
}

export function addAbilityToLogout({ state, appEl }) {
    appEl.addEventListener("click", (e) => {
        if (!e.target.classList.contains("controls__logout")) {
            return;
        }
        logout();
        render({ state, appEl });
        fetchLogout()
        .catch( err => {
            setError(err?.error || "ERROR");
            render({ state, appEl });
        });
    });
}

export function addAbilityToSendMessage({ state, appEl }) {
    appEl.addEventListener("submit", (e) => {
        if (!e.target.classList.contains("send__form")) {
            return;
        }
        const text = appEl.querySelector(".send__text").value;
        fetchAddMessage(text)
        .then( text => {
            addMessage({ id: text.id, text });
            render({ state, appEl });
            scrollToLatestMessage();
        })
        .catch( err => {
            setError(err?.error || "ERROR");
            render({ state, appEl });
        });
    });
}

export function scrollToLatestMessage() {
    const messagesEl = document.querySelector(".messages");
    if (messagesEl) {
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }
}