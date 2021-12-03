import React, { useState }  from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTask } from '../../store/actions/taskActions';
import { selectUsersInTeam } from "../../store/selectors/teamSelectors";
import useFetchUsers from "../../hooks/useFetchUsers";


const CreateTask = (props) => {
    const [title, setTitle] = useState(props.userId);
    const [description, setDescription] = useState('');
    //const [assigned, setAssigned] = useState(props.userId);

    const navigate = useNavigate();

    const { users } = useFetchUsers();
    const toAssignUsers = useSelector((state) => selectUsersInTeam(state, users));

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const task = {
            title: title,
            description: description,
        }
        /*if(assigned !== "myself"){
            task.assignedId = assigned;
        }*/
        props.createTask(task);
        navigate('/');
    }

        return (
            <div className= 'create'>
                <h2>Add a New Task</h2>
                <form onSubmit={handleSubmit}>
                    <label>Task name:</label>
                    <input
                        type="text"
                        required
                        id = "title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>Task description:</label>
                    <textarea
                        required
                        id="description"
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    {/*<label>Assign task to:</label>
                    <select defaultValue="myself" 
                        onChange={(e) => setAssigned(e.target.value)}
                        className="select-css"
                    >s
                        { toAssignUsers.map((user) => ( <option key={user._id} value={user._id}>{ user.username }</option> )) }
                     </select>  */}
                    <button>Add Task</button>
                </form>
            </div>
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