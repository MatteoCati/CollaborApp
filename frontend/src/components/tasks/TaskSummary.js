import { Link } from "react-router-dom";

const TaskSummary = ({ task }) => {
    return ( 
        <div className="activity-preview">
            <Link to={`/tasks/${task._id}`}>
                <h2>{ task.title }</h2>
                <p> Assigned to: { task.assignedUsername }</p>
            </Link>
        </div> 
    );
}
 
export default TaskSummary;