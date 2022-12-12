const uuid = require('uuid').v4;

const posts = {};
const userPostIds = {};
populateInitPosts();

// posts
function getAllPosts() {
    return posts;
}

function getPostsByUser(username) {
    if (!userPostIds[username]){
        return {};
    }
    const userPostIdsArr = userPostIds[username];
    const postsByUser = Object.keys(posts)
        .filter(id => userPostIdsArr.includes(id))
        .reduce((obj, key) => {
            return {
                ...obj,
                [key]: posts[key]
            };
        }, {});
    return postsByUser;
}

function containsPost(id) {
    return !! posts[id];
}

function getPost(postId) {
    return posts[postId];
}

function addPost(username, text) {
    const id = uuid();
    posts[id] = {
        id,
        username,
        text,
        comments: {},
        featured: false,
    };
    if (!userPostIds[username]) {
        userPostIds[username] = [];
    }
    userPostIds[username].push(id);
    return id;
}

function isPostCreatedBy(id, username) {
    return posts[id].username === username;
}

function updatePostFeaturedStatus(id, isFeatured) {
    posts[id].featured = isFeatured;
    return posts[id];
}

// comments
function containsComment(postId, commentId) {
    return !!posts[postId].comments[commentId];
}

function getComment(postId, commentId) {
    return posts[postId].comments[commentId];
}

function addComment(postId, username, content) {
    const id = uuid();
    posts[postId].comments[id] = {
        id,
        postId,
        username,
        content,
    };
    return posts[postId];
}

function isCommentCreatedBy(postId, commentId, username) {
    return posts[postId].comments[commentId].username === username;
}

function deleteComment(postId, commentId) {
    delete posts[postId].comments[commentId];
    return posts[postId];
}

function populateInitPosts() {
    const id1 = addPost("danny", 
        `Winter Holiday Celebration! Come and join in games, festive refreshments, treats and gifts to celebrate the holiday season. The celebration will be on Friday, December 16 at our 225 Event Space.`);
    const id2 = addPost("huskyhehe", "Does anyone know when will the Seattle campus close for the winter break?");
    addComment(id1, "danny", "We welcome all students and staff!")
    addComment(id1, "huskyhehe", "Sounds like fun!");
    posts[id1].featured = true;
    return posts;
}


module.exports = {
    getAllPosts,
    getPostsByUser,

    containsPost,
    getPost,
    addPost,
    isPostCreatedBy,
    updatePostFeaturedStatus,

    containsComment,
    getComment,
    addComment,
    isCommentCreatedBy,
    deleteComment,
}