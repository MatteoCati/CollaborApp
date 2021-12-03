import { connect, useSelector } from "react-redux";
import { useParams } from "react-router";
import useFetchUsers from "../../hooks/useFetchUsers";
import { addUserToTeam } from "../../store/actions/teamActions";
import { selectUsersNotInTeam, teamByIdSelector } from "../../store/selectors/teamSelectors";

const TeamDetails = (props) => {
    var userId = null;
    //const navigate = useNavigate();

    const { id } = useParams();

    const team = useSelector((state) => teamByIdSelector(state, id));

    const { users } = useFetchUsers();
    const toAddUsers = useSelector((state) => selectUsersNotInTeam(state, users));



    const handleAddUser = (e) => {
        if(!userId){
            return;
        }
        props.addUser(userId);
    }


    return ( 
        <div className='activity-details'>
            <h2>{ team.name }</h2>
            <p>Add User to the team:</p>
            <select defaultValue="unselected" onChange={(e) => {userId = e.target.value}}
                className="select-css"
            >
                <option disabled value="unselected"> -- select a user -- </option>
                { toAddUsers.map((user) => ( <option key={user._id} value={user._id}>{ user.username }</option> )) }
            </select>      
            <button onClick={handleAddUser}>Add</button> 
        </div> 
    );
}


const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (userId) => dispatch(addUserToTeam(userId))
    };
}
 
export default connect(null, mapDispatchToProps)(TeamDetails);