import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import LoggedInLinks from "./LoggedInLinks";
import LoggedOutLinks from './LoggedOutLinks';

const Navbar = (props) => {
    const { auth } = props;

    const username = auth.user ? ("- " + auth.user.username) : "";
    return ( 
        <nav className="navbar">
            <h1><NavLink to="/">TW {username}</NavLink></h1>
                { auth.isLogged ? <LoggedInLinks/> : <LoggedOutLinks/> }
        </nav>
     );
}
 
const mapStateToProps = (state) => {
    //console.log("Navbar - Current state:", state);
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Navbar);
