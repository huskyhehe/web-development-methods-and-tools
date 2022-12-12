export const LOGIN_STATUS = {
    PENDING: 'pending',
    NOT_LOGGED_IN: 'notLoggedIn',
    IS_LOGGED_IN: 'loggedIn',
};

export const ROLES = {
    USER: 'user',
    ADMIN: 'admin',
}

export const PAGES = {
    POSTS_FEED: 'postsFeed',
    POST_DETAILS: 'postDetails',
    USER_PROFILE: 'userProfile',
}


export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',

    USER_MISSING: 'noSuchUser',
    NO_AUTHORIZATION: 'no-authorization',

    REQUIRED_TEXT: 'required-text',
    POST_MISSING: 'noSuchPostId',

    REQUIRED_CONTENT: 'required-content',
    COMMENT_MISSING: 'noSuchCommentId',

    LIMIT_EXCEEDED: 'limit-exceeded',
};

export const CLIENT = {
    NETWORK_ERROR: 'networkError',
    NO_SESSION: 'noSession',
    UNKNOWN_ACTION: 'unknownAction',
};

export const MESSAGES = {
    [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
    [SERVER.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records, please try again.',
    [SERVER.REQUIRED_USERNAME]: 'Please enter a valid (letters and/or numbers) username',

    [SERVER.USER_MISSING]: 'There is no such user.',
    [SERVER.NO_AUTHORIZATION]: 'You are not authorized to perform this action',

    [SERVER.REQUIRED_TEXT]: 'Please enter the text to post',
    [SERVER.TEXT_MISSING]: 'The post does not exit',

    [SERVER.REQUIRED_CONTENT]: 'Please enter the content to comment',
    [SERVER.COMMENT_MISSING]: 'The comment does not exit',

    [SERVER.LIMIT_EXCEEDED]: 'Please keep the content within 280-character length',

    default: 'Something went wrong.  Please try again',
};


export const ACTIONS = {
    LOG_IN: 'logIn',
    LOG_OUT: 'logOut',

    START_LOADING_POSTS: 'startLoadingPosts',
    REPLACE_POSTS: 'replacePosts',

    ADD_POST: 'addPost',
    VIEW_POST_DETAILS: 'viewPostDetails',
    TOGGLE_POST_FEATURED: 'togglePostFeatured',

    ADD_COMMENT: 'addComment',
    DELETE_COMMENT: 'deleteComment',

    VIEW_USER_PROFILE: 'viewUserProfile',   
    BACK_TO_FEED: 'backToFeed', 

    REPORT_ERROR: 'reportError',
};
