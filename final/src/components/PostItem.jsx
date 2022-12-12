import { ROLES } from "../constants";

function PostItem({ post, id, creator, onViewPostDetails, onViewUserProfile, role, onTogglePostFeatured }) {
    return (
        <div className="post__item">
            {post.featured && <p className="featured__label">featured</p>}

            <button
                className="creator"
                data-user={creator}
                onClick={(e) => {
                    const user = e.target.dataset.user;
                    onViewUserProfile(user);
                }}
            >
                {post.username}
            </button>

            <p className="post__text">{post.text}</p>

            <div>
                <button
                    className="view__comment__button"
                    data-id={id}
                    onClick={(e) => {
                        const id = e.target.dataset.id;
                        onViewPostDetails(id);
                    }}
                >
                    comments {Object.keys(post.comments).length}
                </button>

                <button
                    className="view__details__button"
                    data-id={id}
                    onClick={(e) => {
                        const id = e.target.dataset.id;
                        onViewPostDetails(id);
                    }}
                >
                    View details
                </button>

                {role === ROLES.ADMIN && (
                    <button
                        className="toggle__featured__button"
                        data-id={id}
                        onClick={(e) => {
                            const id = e.target.dataset.id;
                            onTogglePostFeatured(id);
                        }}
                    >
                        {post.featured ? "Cancel featured" : "Set as featured"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default PostItem;
