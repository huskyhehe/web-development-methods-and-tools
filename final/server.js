const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const posts = require('./posts');
const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());


// sessions //////////////////////////////////////////////////////////////////
// get session
app.get('/api/v1/session', (req, res) => {
    // check sid
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    res.json({ username });
});

// post session
app.post('/api/v1/session', (req, res) => {
    const { username } = req.body;
    if (!users.isValid(username)) {
        res.status(400).json({ error: 'required-username' });
        return;
    }
    if (username === 'dog') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }

    const sid = sessions.addSession(username);
    const existingUserData = users.getUserData(username);

    if (!existingUserData) {
        users.addUserData(username, posts.getAllPosts());
    }

    res.cookie('sid', sid);
    res.json(users.getUserData(username));
});

// delete session
app.delete('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (sid) {
        res.clearCookie('sid');
    };

    if (username) {
        sessions.deleteSession(sid);
    }

    res.json({ username });
});


// posts ///////////////////////////////////////////////////////////////////
// get posts
app.get('/api/v1/posts', (req, res) => {
    // check sid
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    res.json(users.getUserData(username));
});

// post a post
app.post('/api/v1/posts', (req, res) => {
    // check sid
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    // check role: normal user only
    if (username === "admin") {
        res.status(403).json({ error: 'no-authorization' });
        return;
    }

    const { text } = req.body;
    // check post's text
    if(!text || !text.trim()) {
      res.status(400).json({ error: 'required-text' });
      return;
    }
    if(text.length > 280) {
        res.status(400).json({ error: 'limit-exceeded' });
        return;
    }
    
    posts.addPost(username, text);
    res.json(posts.getAllPosts());
});

// get a post
app.get('/api/v1/posts/:id', (req, res) => {
    // check sid
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    const { id } = req.params;
    // check if post exists
    if (!posts.containsPost(id)) {
        res.status(404).json({ error: `noSuchPostId`, message: `No post with id ${id}` });
        return;
    }

    res.json(posts.getPost(id));
});

// update a post
app.patch('/api/v1/posts/:id', (req, res) => {
    // check sid
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    // check role: admin only
    if (username !== "admin") {
        res.status(403).json({ error: 'no-authorization' });
        return;
    }

    const { id } = req.params;
    // check if post exists
    if (!posts.containsPost(id)) {
        res.status(404).json({ error: `noSuchPostId`, message: `No post with id ${id}` });
        return;
    }
    
    const { featured } = req.body;
    posts.updatePostFeaturedStatus(id, featured);
    res.json(posts.getPost(id));
});


// comments /////////////////////////////////////////////////////////////
// post a comment
app.post('/api/v1/posts/:id/comments', (req, res) => {
    // check sid
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    // check role: normal user only
    if (username === "admin") {
        res.status(403).json({ error: 'no-authorization' });
        return;
    }

    const { id } = req.params;
    // check if the post exists
    if (!posts.containsPost(id)) {
        res.status(404).json({ error: `noSuchPostId`, message: `No post with id ${id}` });
        return;
    }

    const { content } = req.body;
    // check comment's content
    if (!content || !content.trim()) {
        res.status(400).json({ error: 'required-content' });
        return;
    }
    if(content > 280) {
        res.status(400).json({ error: 'limit-exceeded' });
        return;
    }

    posts.addComment(id, username, content);  
    res.json(posts.getPost(id));
});

// delete a comment
app.delete('/api/v1/posts/:id/comments/:commentId', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const { id, commentId } = req.params;
    // check if both the post and the post's comment exit
    if (!posts.containsPost(id)) {
        res.status(404).json({ error: `noSuchPostId`, message: `No post with id ${id}` });
        return;
    }
    if (!posts.containsComment(id, commentId)) {
        res.status(404).json({ error: `noSuchCommentId`, message: `No comment with id ${commentId}` });
        return;
    }

    // check if the logged in user is the creator of the comment
    if (!posts.isCommentCreatedBy(id, commentId, username)) {
        res.status(403).json({ error: 'no-authorization' });
        return;
    }

    posts.deleteComment(id, commentId);
    res.json(posts.getPost(id));
});


// users ///////////////////////////////////////////////////////////////////////
// get a user's post
app.get('/api/v1/users/:name', (req, res) => {
    // check sid
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const { name } = req.params;
    // check if user exists
    if (!users.containsUser(name)) {
        res.status(404).json({ error: `noSuchUser`, message: `No user with username ${name}` });
        return;
    }

    res.json(posts.getPostsByUser(name));
});


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));



