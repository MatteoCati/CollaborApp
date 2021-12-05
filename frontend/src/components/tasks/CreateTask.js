import React, { useState }  from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTask } from '../../store/actions/taskActions';
import { selectUsersInTeam } from "../../store/selectors/teamSelectors";
import useFetchUsers from "../../hooks/useFetchUsers";

import { Typography, Button, Container, TextField, Select, MenuItem,
            FormControl, InputLabel } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';



const CreateTask = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedId, setAssignedId] = useState(props.userId);

    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const navigate = useNavigate();

    const { users } = useFetchUsers();
    const toAssignUsers = useSelector((state) => selectUsersInTeam(state, users));

    const handleSubmit = (e) => {
        e.preventDefault();
        setTitleError(false);
        setDescriptionError(false);

        // Check errors
        let error = false;
        if(title === ''){
            setTitleError(true);
            error = true;
        }
        if(description === ''){
            setDescriptionError(true);
            error = true;
        }
        if(error){
            return;
        }

        const task = {
            title: title,
            description: description,
            assignedId: assignedId
        };
        props.createTask(task);
        navigate('/');
    }


    const fieldStyle = {
        m: 2,
        display: "block",
    }
    
    return (
            <Container>
                <Typography 
                    variant="h6" 
                    component="h2" 
                    gutterBottom 
                    color="textSecondary"
                >Add a New Task</Typography>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
                    <TextField 
                        sx={fieldStyle}
                        label="Title"
                        variant="standard"
                        required
                        fullWidth
                        onChange={(e) => setTitle(e.target.value)}
                        error={titleError}
                    />
                    <TextField 
                        sx = {fieldStyle}
                        label="Desription"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        required
                        error={descriptionError}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <FormControl sx={fieldStyle}>
                        <InputLabel id="select-assign-label">Assigned to:</InputLabel>
                        <Select 
                            sx={{minWidth: 300}}
                            labelId="select-assign-label"
                            value={assignedId}
                            label="Assigned to:"
                            variant="outlined"
                            onChange={(e) => {setAssignedId(e.target.value)}}
                        >
                            { toAssignUsers.map((user) => ( <MenuItem key={user._id} value={user._id}>{ user.username }</MenuItem> )) }
                        </Select>
                    </FormControl>
                    
                    <Button 
                        type="submit"
                        variant="contained"
                        color="secondary"
                        endIcon = {<SendIcon/>}
                    >Add Task</Button>
                </form>
            </Container>
        );
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTask: (task) => dispatch(createTask(task)),
    };
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.user._id
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);