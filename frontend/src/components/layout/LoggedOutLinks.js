import { NavLink } from 'react-router-dom';

const LoggedOutLinks = () => {
    return (
        <div className="links">
            <NavLink to="/signin">Log in</NavLink>
            <NavLink to="/signup">Sign up</NavLink>
        </div>
    );
}

export default LoggedOutLinks;