import { useState } from 'react';

function UpdateWordForm({ onUpdateWord }) {

    const [word, setWord] = useState('');

    function onSubmit(e) {
        e.preventDefault();
        onUpdateWord(word);
        setWord('');
    }

    function onChange(e) {
        setWord(e.target.value);
    }

    return (
        <form className="update__form" action="#/update" onSubmit={onSubmit}>
            <input 
                className="update__word" 
                value={word} 
                onChange={onChange} 
                placeholder="Enter word" 
                required
            />
            <button type="submit" className="update__button" disabled={!word}>Update</button>
        </form>
    );
}

export default UpdateWordForm;