import { useSelector, connect } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { changeTaskStatus, deleteTask } from "../../store/task/taskActions";
import { taskByIdSelector } from "../../store/task/taskSelectors";

const TaskDetails = ({ changeComplete, deleteCurrent }) => {
    
    const navigate = useNavigate();

    const { id } = useParams();

    const task = useSelector((state) => taskByIdSelector(state, id));

    const handleDelete = () => {
        deleteCurrent(task);
        navigate('/');
    }
    const handleComplete = () => {
        changeComplete(task)
    }

    return ( 
        <div className='activity-details'>
            <article>
                <h2>{ task.title }</h2>
                <p>Assigned to { task.assignedUsername }</p>
                <p>Created by { task.ownerUsername }</p>
                <div>{ task.description }</div>
                <button onClick={handleComplete}>{ task.completed ? 'Set Active' : 'Set Completed'}</button>
                <button onClick={handleDelete}>Delete</button>
            </article>

           
        </div> 
    );
}


const mapDispatchToProps = (dispatch) => {
    return {
        changeComplete: (task) => dispatch(changeTaskStatus(task)),
        deleteCurrent: (task) => dispatch(deleteTask(task)), 
    };
}
 
export default connect(null, mapDispatchToProps)(TaskDetails);