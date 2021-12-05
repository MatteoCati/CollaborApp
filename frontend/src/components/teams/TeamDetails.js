import { connect, useSelector } from "react-redux";
import { useParams } from "react-router";
import useFetchUsers from "../../hooks/useFetchUsers";
import { addUserToTeam } from "../../store/actions/teamActions";
import { selectUsersNotInTeam, teamByIdSelector } from "../../store/selectors/teamSelectors";
import { Container, Select, Typography, MenuItem, Button, InputLabel, FormControl } from "@mui/material";
import { useState} from "react";
//import { useNavigate} from "react-router-dom";

const TeamDetails = (props) => {
    const [userId, setUserId] = useState('');
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
        //navigate("/");
    }


    return ( 
        <Container>
            <Typography variant="h6" color="textSecondary">{ team.name }</Typography>
            <Typography>Add user to the team: </Typography>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="add-user-label">User</InputLabel>
            <Select 
                sx = {{mb: 2}}
                label="User"
                labelId="add-user-label"
                value = {userId}
                onChange={(e) => setUserId(e.target.value)}
            >
                { toAddUsers.map((user) => ( <MenuItem key={user._id} value={user._id}>{ user.username }</MenuItem> )) }
            </Select>
            <Button onClick={handleAddUser} variant="contained">Add</Button> 
            </FormControl>
        </Container> 
    );
}


const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (userId) => dispatch(addUserToTeam(userId))
    };
}
 
export default connect(null, mapDispatchToProps)(TeamDetails);