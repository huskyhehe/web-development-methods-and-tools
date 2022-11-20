const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

const messages = require("./messages");
const sessions = require("./sessions");
const users = require("./users");

app.use(cookieParser());
app.use(express.static("./public"));
app.use(express.json());


// GET api/session
app.get("/api/session", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: "auth-missing" });
        return;
    }
    res.json({username});
});

// POST api/session
app.post("/api/session", (req, res) => {
    const { username } = req.body;

    if (!users.isValid(username)) {
        res.status(400).json({ error: "required-username" });
        return;
    }

    if (username === "dog") {
        res.status(403).json({ error: "auth-insufficient" });
        return;
    }

    const sid = sessions.addSession(username);
    const existingUserData = users.getUserData(username);
  
    if(!existingUserData) {
      users.addUserData(username, messages.getMessages());
    }
  
    res.cookie('sid', sid);
    res.json(users.getUserData(username));
});

// GET api/users
app.get("/api/users", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: "auth-missing" });
        return;
    }
    res.json(users.getOnlineUsers());
});

// DELETE api/session
app.delete("/api/session", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";

    if (sid) {
        res.clearCookie("sid");
    }

    if (username) {
        sessions.deleteSession(sid);
    }

    res.json({ username });
});

// GET api/messages
app.get("/api/messages", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: "auth-missing" });
        return;
    }
    res.json(users.getUserData(username));
});

// POST api/messages
app.post("/api/messages", (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : "";
    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: "auth-missing" });
        return;
    }
    const { text } = req.body;
    if (!text.trim()) {
        res.status(400).json({ error: "required-text" });
        return;
    }
    const id = messages.addMessage(username, text.trim());
    res.json(messages.getMessage(id));
});


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));