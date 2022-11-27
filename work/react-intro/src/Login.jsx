import { useState } from "react";
import { validateUsername } from "./validation";


function Login({ username, setUsername, setLoggedIn }) {

    const [status, setStatus] = useState("");

    function handleSubmit(e) {
        e.preventDefault();   
        const statusMessage = validateUsername(username);     
        setStatus(prevStatus => statusMessage); 
        if (statusMessage) {
            setUsername("");
            return;
        }
        setLoggedIn(true);
    }


    return (
        <div className="login">
            { (status) && <div className="login-status">{status}</div> }
            <h2>Login</h2>
            <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
                <label>
                    Enter username:
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onInput={(e) => setUsername(e.target.value)}
                    />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
