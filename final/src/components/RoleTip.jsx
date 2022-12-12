import { ROLES } from "../constants";

function RoleTip({ role }) {
    return (
        <div className="intro">
            <h4>Tip:</h4>
            <p>
                {role === ROLES.USER
                    ? "You can view posts, create posts, create comments and delete your comments"
                    : "You can set whether the post is featured"
                }
            </p>
        </div>
    );
}

export default RoleTip;
