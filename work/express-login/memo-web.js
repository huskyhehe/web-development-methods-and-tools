const memoWeb = {
    loginPage: function () {
        return `
            <!doctype html>
            <html>
                <head>
                    <title>Memo</title>
                    <link rel="stylesheet" href="memo.css">
                </head>
                <body>
                    <div class="memo-app">
                        <h1>Login</h1>
                        <form action="/login" method="post">
                            <input type="text" name="username" placeholder="Enter username" required/>
                            <button type="submit" class="login-btn">Login</button>
                        </form>
                    </div>
                </body>
            </html>
        `;
    },

    errorPage: function ( errorMsg ) {
        return `
            <!doctype html>
            <html>
                <head>
                    <title>Memo</title>
                    <link rel="stylesheet" href="memo.css">
                </head>
                <body>
                    <div class="memo-app">
                        <h2>Invalid Username:</h2>
                        <p>${errorMsg}</p>
                        <a href="/">Back to login page >> </a>
                    </div>
                </body>
            </html>
        `;
    },

    dataPage: function ( username, word ) {
        return `
            <!doctype html>
            <html>
                <head>
                    <title>Memo</title>
                    <link rel="stylesheet" href="memo.css">
                </head>
                <body>
                    <div class="memo-app">
                        <div class="user-info">
                            <h1>Welcome to Memo</h1>
                            <span>Logged in as: </span>
                            <span class="username">${username}</span>
                        </div>
                        <div class="stored-word">
                            <span>Stored Word: </span>
                            <span class="word">${word}</span>
                        </div>
                        <form action="/update" method="post">
                            <input type="text" name="word" placeholder="Update stored word" required/>
                            <button class="update-btn" type="submit">Update</button>
                        </form>
                        <form action="/logout" method="POST">
                            <button type="submit" class="logout-btn">Logout</button>
                        </form>
                    </div>
                </body>
            </html>
        `;
    },
};

module.exports = memoWeb;