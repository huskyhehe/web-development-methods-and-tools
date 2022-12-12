import { useState } from "react";
import LengthIndicator from "./LengthIndicator";

function AddCommentForm({ viewingPost, onAddComment }) {

    const [content, setContent] = useState("");

    function onSubmit(e) {
        e.preventDefault();
        setContent("");

        // blank content not allowed to submit
        if (content && content.trim()) {
            onAddComment(viewingPost.id, content.trim());
        }
    }

    function onTyping(e) {
        setContent(e.target.value);
    }

    return (
        <form className="add__comment__form" action="#/add" onSubmit={onSubmit}>
            <input
                className="add__content"
                value={content}
                onChange={onTyping}
                placeholder="Enter your comment"
            />
            <div className="submit__wrapper">
                <LengthIndicator inputString={content} maxLength={280} />
                <button
                    type="submit"
                    className="add__button"
                    disabled={!content || !content.trim() || content.trimStart().length > 280}
                >
                    Comment
                </button>
            </div>

        </form>
    );
}

export default AddCommentForm;
