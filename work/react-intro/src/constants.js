export const LOGIN  = {
    AUTH_INSUFFICIENT: "auth-insufficient",
    REQUIRED_USERNAME: "required-username",
    INVALID_USERNAME: "invalid-username",
};

export const MESSAGES = {
    [LOGIN.AUTH_INSUFFICIENT]: "This username is not a valid user",
    [LOGIN.REQUIRED_USERNAME]: "Please enter a valid (letters and/or numbers) username",
    [LOGIN.INVALID_USERNAME]: "Username should only contain letters or numbers",
    default: "Something went wrong. Please try again",
};

export const GAME_RULE = "The secret word consists of 5 letters. Enter a 5-letter word to guess it out!";

export const SECRET_WORD = "recat";