import { useState } from 'react';

function LoginForm({ onLogin }) {

    const [username, setUsername] = useState('');

    function onSubmit(e) {
        e.preventDefault();
        if (username) {
            onLogin(username); 
        }
        setUsername('');
    }

    function onChange(e) {
        setUsername(e.target.value);
    }

    return (
        <div className="login">
            <h2>Login</h2>
            <form className="login__form" action="#/login" onSubmit={onSubmit}>
                <input 
                    className="login__username" 
                    value={username} 
                    onChange={onChange} 
                    placeholder="Enter username" 
                    required
                />
                <button className="login__button" type="submit" disabled={!username}>Login</button>
            </form>
        </div>
    );
}

export default LoginForm;