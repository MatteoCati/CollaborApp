import Card from "@mui/material/Card";
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { makeStyles } from "@mui/styles"
import { IconButton, Typography, Button } from "@mui/material";
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import { changeTaskStatus, deleteTask } from "../../store/actions/taskActions";
import { connect } from "react-redux";


const useStyles = makeStyles({
    todo: {
        border: (assigned) =>{
            if(assigned){
                return "1px solid green"
            }
        }
    },
    
})

const TaskSummary = (props) => {

    const task = props.task;

    const handleDelete = () => {
        props.deleteCurrent(task);
    }

    const handleComplete = () => {
        props.changeComplete(task)
    }

    const classes = useStyles(task.assignedId === props.user._id);

    const avatarStyle= {backgroundColor: "secondary"};
    if(task.assignedId === props.user._id){
        avatarStyle.backgroundColor = "green";
    }
    
    
    return (
        <div>
            <Card elevation={1} className={classes.todo}>
                <CardHeader 
                    action={
                        <IconButton onClick={handleDelete}>
                          <DeleteOutlined />
                        </IconButton>
                      }
                    title={task.title}
                    subheader={task.assignedUsername}
                />
                <CardContent>
                    <Typography variant="body2">
                        {task.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Created by {task.ownerUsername}
                    </Typography>
                    <Button 
                        variant="contained"
                        color="secondary"
                        onClick={handleComplete}
                        sx = {{mt: 2}}
                    >
                        { task.completed ? 'Set Active' : 'Set Completed'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeComplete: (task) => dispatch(changeTaskStatus(task)),
        deleteCurrent: (task) => dispatch(deleteTask(task)), 
    };
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(TaskSummary);