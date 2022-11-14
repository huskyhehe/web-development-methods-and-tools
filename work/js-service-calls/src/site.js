"use strict";

import { state } from "./state";
import { MESSAGES } from "./messages";
import { fetchPageLoad, fetchLogin, fetchUpdatedWord, fetchLogout, fetchWordView } from "./services";


(function() {
    const appEl = document.querySelector('#memo-app');

    appEl.addEventListener('submit', (e) => {
        if (e.target.classList.contains('login-form')) {
            e.preventDefault();
            const username = document.querySelector('.username-input').value;  
            login(username);
            return;
        }
        if (e.target.classList.contains('update-form')) {
            e.preventDefault();
            const newWord = document.querySelector('.word-input').value;  
            updateWord(newWord);
            return;
        }
    });
    appEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('logout-btn')) {
            logout();
            return;
        }
    });

    loadPage();


    function loadPage() {
        fetchPageLoad()
        .then(() => getWordView())
        .catch(err => {
            if (err.error === "auth-missing") {
                renderLogin();
                return;
            }
            updateStatusEl(err.error);
        })
    }

    function login(username) {
        fetchLogin(username)
        .then(() => getWordView())
        .catch(err => {
            updateStatusEl(err.error);
            document.querySelector('.username-input').value = '';
        });
    }

    function getWordView() {
        fetchWordView()
        .then(data => {
            state.activeUser = data;
            renderWordView(state.activeUser);
        })
        .catch(err => {
            if (err.error === "auth-missing") {
                renderLogin();
            }
            updateStatusEl(err.error)
        });
    }

    function updateWord(newWord) {
        fetchUpdatedWord(newWord)
        .then(data => {
            state.activeUser = data;
            renderWordView(state.activeUser);
        })
        .catch(err => {
            if (err.error === "auth-missing") {
                renderLogin();
            }
            updateStatusEl(err.error);
            document.querySelector('.word-input').value = '';
        });
    }

    function logout() {
        fetchLogout()
        .then(() => renderLogin())
        .catch(err => {
            return;
        });
    }

    function updateStatusEl(message) {
        const statusEl = document.querySelector('.status');
        statusEl.innerHTML = MESSAGES[message] || MESSAGES.default;
    }


    function renderLogin() {
        appEl.innerHTML = `
            <div class="status"></div>
            <h1>Login</h1>
            <form action="/api/session" method="post" class="login-form">
                <input type="text" name="username" class="username-input" placeholder="Enter username" />
                <button type="submit" class="login-btn">Login</button>
            </form>  
        `;
    }

    function renderWordView(user) {
        appEl.innerHTML = `
            <div class="status"></div>
            <h1>Welcome to Memo</h1>
            <div class="user-info">
                <span>Logged in as: </span>
                <span class="username">${user.username}</span>
            </div>
            <div class="stored-word">
                <span>Stored Word: </span>
                <span class="word">${user.storedWord}</span>
            </div>
            <form action="/api/word" method="post" class="update-form">
                <input type="text" name="word" class="word-input" placeholder="Update stored word"/>
                <button class="update-btn" type="submit">Update</button>
            </form>
            <button type="button" class="logout-btn">Logout</button>
        `
    }

})();