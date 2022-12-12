import { useState } from "react";

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState("");

    function onChange(e) {
        setUsername(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        
        // blank username not allowed to submit
        if (username && username.trim()) {
            onLogin(username); 
            setUsername("");
        }
    }

    return (
        <form className="login__form" action="#/login" onSubmit={onSubmit}>
            <input
                className="login__username"
                value={username}
                onChange={onChange}
                placeholder="Enter username"
            />
            <button
                className="login__button"
                type="submit"
                disabled={!username || !username.trim()}
            >
                Login
            </button>
        </form>
    );
}

export default LoginForm;
