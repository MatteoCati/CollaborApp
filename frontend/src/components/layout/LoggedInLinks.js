import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logOut } from '../../store/actions/authActions';

const LoggedInLinks = (props) => {
    return (
        <div className="links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/createteam">Create Team</NavLink>
            { props.currentTeam && <NavLink to={`/teams/${props.currentTeam._id}`}>Manage Team</NavLink>}
            <span onClick={props.logOut}>Logout</span>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(logOut())
    };
}

const mapStateToProps = (state) => {
    return {
        currentTeam: state.team.currentTeam,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoggedInLinks);