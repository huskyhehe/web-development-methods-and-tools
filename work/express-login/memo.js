const users = {};
const regex = /^[A-Za-z0-9]*$/;

function validateUsername( username ) {
    if ( username === "" ) {
        return "Username must contain at least one letter or number.";
    };
    if ( username == "dog" ) {
        return "Username must not be dog.";
    }; 
    if ( !username.match(regex) ) {
        return "Username must only contain letters and numbers.";
    };
    return "";
};

function getWord( username ) {
    return memo.users[username] || "";
};

function updateWord( username, newWord ) {
    if (newWord) {
        memo.users[username] = newWord;
    };
};

const memo = {
    users,
    validateUsername,
    getWord,
    updateWord,
};

module.exports = memo;