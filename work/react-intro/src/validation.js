import { LOGIN, MESSAGES } from "./constants";
const usernameRegex = /^[A-Za-z0-9_]+$/;

export function validateUsername(username) {
    if (!username.trim()) {
        return MESSAGES[LOGIN.REQUIRED_USERNAME];
    }
    if (username.trim() === "dog") {
        return MESSAGES[LOGIN.AUTH_INSUFFICIENT];
    }
    if (!username.trim().match(usernameRegex)) {
        return [MESSAGES.LOGIN.INVALID_USERNAME];
    }
    return "";
}