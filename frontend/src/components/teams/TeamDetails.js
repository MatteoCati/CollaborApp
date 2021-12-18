import { connect, useSelector } from "react-redux";
import { useParams } from "react-router";
import useFetchUsers from "../../hooks/useFetchUsers";
import { addUserToTeam } from "../../store/team/teamActions";
import { selectUsersInTeam, selectUsersNotInTeam, teamByIdSelector } from "../../store/team/teamSelectors";
import { Container, Select, Typography, MenuItem, Button, InputLabel, FormControl, ListItem } from "@mui/material";
import { useState} from "react";
import { List, ListItemText } from "@mui/material";

const TeamDetails = (props) => {
    const [userId, setUserId] = useState('');

    const { id } = useParams();

    const team = useSelector((state) => teamByIdSelector(state, id));

    const { users } = useFetchUsers();
    const toAddUsers = props.selectToAdd(users);
    const members = props.selectMembers(users);

    const handleAddUser = (e) => {
        if(!userId){
            return;
        }
        props.addUser(userId);
        setUserId('');
    }

    return ( 
        <Container>
            <Typography variant="h6" color="textSecondary">{ team.name }</Typography>
            
            { props.user._id === team.ownerId[0] &&
           <>
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
            </>
            }
            <Typography sx={{mt:4}}>Team members:</Typography>
            <List>
                {members.map((user) => (
                    <ListItem key={user._id}>
                        <ListItemText primary={user.username + (user._id === team.ownerId[0] ? " - owner" : "")}/>
                    </ListItem>
                ))}
            </List>
        </Container> 
    );
}


const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (userId) => dispatch(addUserToTeam(userId))
    };
}
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        selectToAdd: (users) => selectUsersNotInTeam(state, users),
        selectMembers: (users) => selectUsersInTeam(state, users),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(TeamDetails);