import TaskSummary from "./TaskSummary";
import Grid from "@mui/material/Grid";
import Masonry from '@mui/lab/Masonry';

const TasksList = ({ tasks }) => {

        return  ( 
            <Masonry columns={4} spacing={1}>
                
                { tasks ? tasks.map(task => (
                    <Grid item md={4} xs={12} sm={6} key={task._id}>
                            <TaskSummary   task={task}/>
                    </Grid> 
                )) : []}
            </Masonry>
        );

    
}
 
export default TasksList;