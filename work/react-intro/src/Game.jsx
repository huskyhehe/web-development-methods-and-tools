import { useState } from "react";
import { GAME_RULE } from "./constants";
import { generateGuessingResult } from "./result";


function Game({ username, setLoggedIn }) {

    const [word, setWord] = useState("");
    const [result, setResult] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        setResult(prevResult => generateGuessingResult(word));
        setWord("");
    }

    return (
        <div className="game">
            <h2>Welcome to word game!</h2>
            <p>Logged in as: {username}</p>
            <button className="logout-btn" onClick={(e) => setLoggedIn(false)}>Logout</button>
            <div className="game-rule">{GAME_RULE}</div>
            <form className="game-form" onSubmit={(e) => handleSubmit(e)}>
                <label>
                    Enter guessing word: 
                    <input
                        type="text"
                        name="word"
                        value={word}
                        onInput={(e) => setWord(e.target.value)}
                    />
                </label>
                <button type="submit">Confirm</button>
                { result && <div className="game-result">{result}</div> }
            </form>
        </div>
    )
}

export default Game;