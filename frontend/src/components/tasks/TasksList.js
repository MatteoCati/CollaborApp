import TaskSummary from "./TaskSummary";

const TasksList = ({ tasks }) => {
    
    return ( 
        <div className="activity-list">
            { tasks && tasks.map(task => (
                <TaskSummary  key={task._id} task={task}/>
            ))}
        </div>
    );
}
 
export default TasksList;