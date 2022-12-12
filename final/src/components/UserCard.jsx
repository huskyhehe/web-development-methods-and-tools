function UserCard({ username, numberOfPosts }) {
    return (
        <div className="user__card">
            <h3>{username}</h3>
            <p>
                Number of posts: {numberOfPosts}
            </p>
        </div>

    )
}

export default UserCard;