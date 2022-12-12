function PostDetailCard({ viewingPost }) {
    return (
        <div className="post__detail__card">
            <h3>Post Details</h3>
            <div className="post__detail__wrapper">
                <p className="card__creator">{viewingPost.username}</p>
                <p className="post__text">{viewingPost.text}</p>
                {viewingPost.featured && <p className="featured__label">featured</p>}  
            </div>          
        </div>
    )
}

export default PostDetailCard;
