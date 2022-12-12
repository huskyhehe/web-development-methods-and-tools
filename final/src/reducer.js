import {
    LOGIN_STATUS,
    ROLES,
    PAGES,
    CLIENT,
    ACTIONS,  
} from './constants';

export const initialState = {
    error: '',
    username: '',
    loginStatus: LOGIN_STATUS.PENDING,
    isPostPending: false,
    posts: {},
    role: ROLES.USER,
    page: '',
    viewingPost: {},
    viewingUser: '',
    viewingUserPosts: {},
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.LOG_IN:  
            return {
                ...state,
                error: '', 
                loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
                username: action.username,  
                page: PAGES.POSTS_FEED,
                role: action.role,
            };
        
        case ACTIONS.START_LOADING_POSTS:
            return {
                ...state,
                error: '',
                isPostPending: true,
            };

        case ACTIONS.REPLACE_POSTS:
            return {
                ...state,
                error: '',
                isPostPending: false,
                posts: action.posts, 
            };
        
        case ACTIONS.LOG_OUT:
            return {
                ...state,
                error: '',
                isPostPending: false,
                posts: {},
                loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
                username: '',
                role: ROLES.USER,
                page: '',
                viewingPost: {},
                viewingUser: '',
                viewingUserPosts: {},
            };
        
        case ACTIONS.REPORT_ERROR:
            return {
                ...state,
                error: action.error || 'ERROR',
            };
        
        case ACTIONS.ADD_POST:
            return {
                ...state,
            };
        
        case ACTIONS.VIEW_POST_DETAILS:
            return {
                ...state,
                page: PAGES.POST_DETAILS,
                viewingPost: action.post,
            }

        case ACTIONS.TOGGLE_POST_FEATURED:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [action.post.id]: action.post,
                },
            }
        
        case ACTIONS.ADD_COMMENT:
            return {
                ...state,
                viewingPost: action.post,
            }

        case ACTIONS.DELETE_COMMENT:
            return {
                ...state,
                viewingPost: action.post,
            }
        
        case ACTIONS.VIEW_USER_PROFILE:
            return {
                ...state,
                page: PAGES.USER_PROFILE,
                viewingUser: action.viewingUser,
                viewingUserPosts: action.viewingUserPosts,
            }
        
        case ACTIONS.BACK_TO_FEED:
            return {
                ...state,
                page: PAGES.POSTS_FEED,
                viewingPost: {},
                viewingUser: '',
                viewingUserPosts: {},
            }

        default:
            throw new Error({ error: CLIENT.UNKNOWN_ACTION, detail: action }); 
    }
}

export default reducer;