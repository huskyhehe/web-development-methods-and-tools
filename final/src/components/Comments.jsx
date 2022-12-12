function Comments( {viewingPost, username, onDeleteComment, onViewUserProfile} ) {

    const SHOW = {
        EMPTY: "empty",
        COMMENTS: "comments",
    };

    let show;
    if (!Object.keys(viewingPost.comments).length) {
        show = SHOW.EMPTY;
    } else {
        show = SHOW.COMMENTS;
    }

    return (
        <div className="comments">
            { show === SHOW.EMPTY && <p className="empty">No comment yet.</p> }
            { show === SHOW.COMMENTS && (
                <ul className="comment__list">
                    {Object.values(viewingPost.comments).map((comment) => (
                        <li className="comment__item" key={comment.id}>
                            <button
                                className="creator"
                                data-user={comment.username}
                                onClick={(e) => {
                                    const user = e.target.dataset.user;
                                    onViewUserProfile(user);
                                }}
                            >
                                {comment.username}
                            </button>
                            <p>{comment.content}</p>
                            { comment.username === username && (
                                <button
                                    className="delete__comment__button"
                                    data-id={comment.id}
                                    onClick={(e) => {
                                        const commentId = e.target.dataset.id;
                                        onDeleteComment(viewingPost.id, commentId);
                                    }}
                                >
                                    Delete my comment
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )} 
        </div>
    )
}

export default Comments;