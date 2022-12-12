import { ROLES, PAGES } from "../constants";

function Controls({ role, page, username, onViewUserProfile, onLogout, onRefresh, onBackToFeed }) {
    return (
        <div className="controls">

            {role === ROLES.USER && (
                <button onClick={(e) => {onViewUserProfile(username)}} className="controls__view__profile">
                    View my profile   
                </button>
            )}

            <button onClick={onLogout} className="controls__logout">
                Logout
            </button>

            {page === PAGES.POSTS_FEED && (
                <button onClick={onRefresh} className="controls__refresh">
                    Refresh
                </button>
            )}

            {page !== PAGES.POSTS_FEED && (
                <button onClick={onBackToFeed} className="controls__back__to__feed">
                    {" <<======= "} Back to feed 
                </button>
            )}
        </div>
    );
}

export default Controls;
