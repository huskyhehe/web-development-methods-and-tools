import { useState } from "react";
import LengthIndicator from "./LengthIndicator";

function AddPostForm({ onAddPost }) {

    const [text, setText] = useState("");

    function onSubmit(e) {
        e.preventDefault(); 
        setText("");

        // blank text not allowed to submit
        if (text && text.trim()) {
            onAddPost(text.trim());
        }
    }

    function onTyping(e) {
        setText(e.target.value);
    }

    return (
        <form className="add__post__form" action="#/add" onSubmit={onSubmit}>
            <input
                className="add__text"
                value={text}
                onChange={onTyping}
                placeholder="Share what's happening around campus..."
            />
            <div className="submit__wrapper">
                <LengthIndicator inputString={text} maxLength={280} />
                <button
                    type="submit"
                    className="add__button"
                    disabled={!text || !text.trim() || text.trimStart().length > 280}
                >
                    Post
                </button>
            </div>

        </form>
    );
}

export default AddPostForm;
