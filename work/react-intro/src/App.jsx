import { useState } from "react";
import Login from "./Login";
import Game from "./Game";
import "./app.css";

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    return (
        <div className="App">
            {isLoggedIn ?
                <Game
                    username={username}
                    setLoggedIn={setIsLoggedIn}
                />
                :
                <Login
                    username={username}
                    setUsername={setUsername}
                    setLoggedIn={setIsLoggedIn}
                />
            }
        </div>
    );
}

export default App;
