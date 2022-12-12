import Loading from "./Loading";
import PostItem from "./PostItem";

function Posts({ posts, isPostPending, onViewPostDetails, onViewUserProfile, role, onTogglePostFeatured }) {

    const SHOW = {
        PENDING: "pending",
        EMPTY: "empty",
        POSTS: "posts",
    };

    let show;
    if (isPostPending) {
        show = SHOW.PENDING;
    } else if (!posts || !Object.keys(posts).length) {
        show = SHOW.EMPTY;
    } else {
        show = SHOW.POSTS;
    }

    return (
        <div className="posts">
            {show === SHOW.PENDING && <Loading className="posts__waiting">Loading Posts...</Loading>}
            {show === SHOW.EMPTY && <p className="empty">No Posts yet.</p>}
            {show === SHOW.POSTS && (
                <ul className="post__list">
                    {Object.values(posts).reverse().map((post) => (
                            <li className="post" key={post.id}>
                                <PostItem
                                    post={post}
                                    id={post.id} 
                                    creator={post.username}
                                    onViewPostDetails={onViewPostDetails}
                                    onViewUserProfile={onViewUserProfile}
                                    role={role} 
                                    onTogglePostFeatured={onTogglePostFeatured}
                                />
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}

export default Posts;
