import { useState, useEffect } from 'react';
import { LOGIN_STATUS, SERVER, CLIENT } from "./constants";
import { fetchSession, fetchLogin, fetchLogout, fetchMemo, fetchUpdateMemo } from "./services";
import Status from './Status';
import Loading from './Loading';
import LoginForm from './LoginForm';
import Controls from './Controls';
import Memo from './Memo';
import UpdateWordForm from './UpdateWordForm';
import './app.css';

function App() {

    // "top level" state
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);
    const [isMemoPending, setIsMemoPending] = useState(false);
    const [word, setWord] = useState('');

    // functions that update state
    function onLogin(username) {
        setIsMemoPending(true);     // Show loading state
        fetchLogin(username)
            .then(memo => {
                setError('');
                setWord(memo.storedWord);
                setIsMemoPending(false);
                setUsername(username);
                setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
            })
            .catch(err => {
                setError(err?.error || 'ERROR');
            });
    }

    function onLogout() {
        setError('');
        setUsername('');
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        setWord('');
        fetchLogout()
            .catch(err => {
                setError(err?.error || 'ERROR');
            });
    }

    function onUpdateWord(word) {
        setError('');
        fetchUpdateMemo(word)
            .then(memo => {
                setWord(memo.storedWord);
            })
            .catch(err => {
                if (err?.error === SERVER.AUTH_MISSING) {
                    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
                }
                setError(err?.error || 'ERROR');
            });
    }

    function onRefresh() {
        setError('');
        setIsMemoPending(true);     // Show loading state
        fetchMemo()
            .then(memo => {
                setWord(memo.storedWord);
                setIsMemoPending(false);
            })
            .catch(err => {
                if (err?.error === SERVER.AUTH_MISSING) {
                    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
                }
                setError(err?.error || 'ERROR'); 
            });
    }

    function checkForSession() {
        fetchSession()
            .then(session => {
                setUsername(session.username);
                setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
                return fetchMemo();
            })
            .catch(err => {
                if (err?.error === SERVER.AUTH_MISSING) {
                    return Promise.reject({ error: CLIENT.NO_SESSION })
                }
                return Promise.reject(err);
            })
            .then(memo => {
                setWord(memo.storedWord);
            })
            .catch(err => {
                if (err?.error === CLIENT.NO_SESSION) {
                    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
                    return;
                }
                setError(err?.error || 'ERROR');
            });
    }
    
    // Initial loading
    useEffect(() => {
        checkForSession();
    }, []);


    return (
        <div className="app">
            <main>
                {error && <Status error={error} />}
                {loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading>}
                {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin} />}
                {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
                    <div className="content">
                        <h2>Hello, <span className="username">{username}</span></h2>
                        <Controls onRefresh={onRefresh} onLogout={onLogout} />
                        <Memo word={word} isMemoPending={isMemoPending} />
                        <UpdateWordForm onUpdateWord={onUpdateWord} />
                    </div>
                )}
            </main>
        </div>
    )
}

export default App;