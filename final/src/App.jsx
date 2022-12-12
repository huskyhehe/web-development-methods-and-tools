import { useEffect, useReducer } from "react";
import reducer, { initialState } from "./reducer";
import {
    ROLES,
    LOGIN_STATUS,
    PAGES,
    CLIENT,
    SERVER,
    ACTIONS,
} from "./constants";
import {
    fetchSession,
    fetchLogin,
    fetchLogout,
    fetchAllPosts,
    fetchPostsByUser,
    fetchAddPost,
    fetchPost,
    fetchUpdatePost,
    fetchAddComment,
    fetchDeleteComment,
} from "./services";
import Status from "./components/Status";
import Loading from "./components/Loading";
import Landing from "./components/Landing";
import LoginForm from "./components/LoginForm";
import Controls from "./components/Controls";
import RoleTip from "./components/RoleTip";
import AddPostForm from "./components/AddPostForm";
import Posts from "./components/Posts";
import PostDetailCard from "./components/PostDetailCard";
import AddCommentForm from "./components/AddCommentForm";
import Comments from "./components/Comments";
import UserCard from "./components/UserCard";
import "./app.css";

function App() {

    const [state, dispatch] = useReducer(reducer, initialState);

    function onLogin(username) {
        dispatch({ type: ACTIONS.START_LOADING_POSTS });
        fetchLogin(username)
            .then((fetchedPosts) => {
                dispatch({
                    type: ACTIONS.LOG_IN,
                    username,
                    role: username === ROLES.ADMIN ? ROLES.ADMIN : ROLES.USER,
                });
                dispatch({ type: ACTIONS.REPLACE_POSTS, posts: fetchedPosts });
            })
            .catch((err) => {
                dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
            });
    }

    function onLogout() {
        dispatch({ type: ACTIONS.LOG_OUT });
        fetchLogout()
            .catch((err) => {
                dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
            });
    }

    function onRefresh() {
        dispatch({ type: ACTIONS.START_LOADING_POSTS });
        fetchAllPosts()
            .then((posts) => {
                dispatch({ type: ACTIONS.REPLACE_POSTS, posts });
            })
            .catch((err) => {
                dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
                if (err?.error === CLIENT.NO_SESSION) {
                    dispatch({ type: ACTIONS.LOG_OUT });
                    return;
                }
            });
    }

    function onAddPost(text) {
        fetchAddPost(text)
            .then((posts) => {
                dispatch({ type: ACTIONS.REPLACE_POSTS, posts: posts });
            })
            .catch((err) => {
                dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
                if (err?.error === CLIENT.NO_SESSION) {
                    dispatch({ type: ACTIONS.LOG_OUT });
                    return;
                }
            });
    }

    function onViewPostDetails(id) {
        fetchPost(id)
            .then((post) => {
                dispatch({ type: ACTIONS.VIEW_POST_DETAILS, post: post });
            })
            .catch((err) => {
                if (err?.error === CLIENT.NO_SESSION) {
                    dispatch({ type: ACTIONS.LOG_OUT });
                    return;
                }
                dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
            });
    }

    function onTogglePostFeatured(id) {
        fetchUpdatePost(id, { featured: !state.posts[id].featured })
            .then((post) => {
                dispatch({ type: ACTIONS.TOGGLE_POST_FEATURED, post });
            })
            .catch((err) => {
                if (err?.error === CLIENT.NO_SESSION) {
                    dispatch({ type: ACTIONS.LOG_OUT });
                    return;
                }
                dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
            });
    }

    function onAddComment(id, content) {
        fetchAddComment(id, content)
            .then((post) => {
                dispatch({ type: ACTIONS.ADD_COMMENT, post: post });
            })
            .catch((err) => {
                dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
            });
    }

    function onDeleteComment(id, commentId) {
        fetchDeleteComment(id, commentId)
            .then((post) => {
                dispatch({ type: ACTIONS.DELETE_COMMENT, post: post });
            })
            .catch((err) => {
                if (err?.error === CLIENT.NO_SESSION) {
                    dispatch({ type: ACTIONS.LOG_OUT });
                    return;
                }
                dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
            });
    }

    function onViewUserProfile(viewingUser) {
        fetchPostsByUser(viewingUser)
            .then((userPosts) => {
                dispatch({
                    type: ACTIONS.VIEW_USER_PROFILE,
                    viewingUser: viewingUser,
                    viewingUserPosts: userPosts,
                });
            })
            .catch((err) => {
                if (err?.error === CLIENT.NO_SESSION) {
                    dispatch({ type: ACTIONS.LOG_OUT });
                    return;
                }
                dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
            });
    }

    function onBackToFeed() {
        dispatch({ type: ACTIONS.BACK_TO_FEED });
        fetchAllPosts()
            .then((posts) => {
                dispatch({ type: ACTIONS.REPLACE_POSTS, posts });
            })
            .catch((err) => {
                dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
                if (err?.error === CLIENT.NO_SESSION) {
                    dispatch({ type: ACTIONS.LOG_OUT });
                    return;
                }
            });
    }

    function checkForSession() {
        fetchSession()
            .then((session) => {
                dispatch({
                    type: ACTIONS.LOG_IN,
                    username: session.username,
                    role:
                        session.username === ROLES.ADMIN
                            ? ROLES.ADMIN
                            : ROLES.USER,
                });
                return fetchAllPosts();
            })
            .catch((err) => {
                if (err?.error === SERVER.AUTH_MISSING) {
                    return Promise.reject({ error: CLIENT.NO_SESSION });
                }
                return Promise.reject(err);
            })
            .then((posts) => {
                dispatch({ type: ACTIONS.REPLACE_POSTS, posts });
            })
            .catch((err) => {
                if (err?.error === CLIENT.NO_SESSION) {
                    dispatch({ type: ACTIONS.LOG_OUT });
                    return;
                }
                dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
            });
    }

    useEffect(() => {
        checkForSession();
    }, []);

    return (
        <div className="app">
            <main>
                {state.error && <Status error={state.error} />}

                {state.loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading>}

                {state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
                    <div className="login">
                        <Landing />
                        <LoginForm onLogin={onLogin} />
                    </div>
                )}

                {state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
                    <div className="yammer">
                        <div className="control__bar"> 
                            <h2>Yammer</h2>
                            <p>Hello, {state.username}</p>                        
                            <Controls
                                role={state.role}
                                page={state.page}
                                username={state.username}
                                onViewUserProfile={onViewUserProfile}
                                onLogout={onLogout}
                                onRefresh={onRefresh}
                                onBackToFeed={onBackToFeed}
                            />
                            <RoleTip role={state.role} />
                        </div>

                        {state.page === PAGES.POSTS_FEED && (
                            <div className="page__feed">
                                {state.role === ROLES.USER && <AddPostForm onAddPost={onAddPost} />}  
                                <Posts
                                    isPostPending={state.isPostPending}
                                    posts={state.posts}
                                    onViewPostDetails={onViewPostDetails}
                                    onViewUserProfile={onViewUserProfile}
                                    role={state.role}
                                    onTogglePostFeatured={onTogglePostFeatured}
                                />                                
                            </div>
                        )}

                        {state.page === PAGES.POST_DETAILS && (
                            <div className="page__post__details">
                                <PostDetailCard  viewingPost={state.viewingPost} />
                                {state.role === ROLES.USER && (
                                    <AddCommentForm
                                        viewingPost={state.viewingPost}
                                        onAddComment={onAddComment}
                                    />
                                )}
                                <Comments
                                    viewingPost={state.viewingPost}
                                    username={state.username}
                                    onDeleteComment={onDeleteComment}
                                    onViewUserProfile={onViewUserProfile}
                                />                              
                            </div>
                        )}

                        {state.page === PAGES.USER_PROFILE && (
                            <div className="page__user__profile">
                                <UserCard 
                                    username={state.viewingUser} 
                                    numberOfPosts={Object.keys(state.viewingUserPosts).length} 
                                />
                                <Posts
                                    isPostPending={state.isPostPending}
                                    posts={state.viewingUserPosts}
                                    onViewPostDetails={onViewPostDetails}
                                    onViewUserProfile={onViewUserProfile}
                                    role={state.role}
                                    onTogglePostFeatured={onTogglePostFeatured}
                                />
                            </div>
                        )}  
                    </div> 
                )}
            </main>
        </div>
    );
}

export default App;