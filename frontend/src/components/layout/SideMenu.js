import List from "@mui/material/List";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { SubjectOutlined, AddCircleOutlined }  from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router';
import { connect } from 'react-redux';






const SideMenu = ({drawerWidth, currentTeam, isLogged}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const useStyles = makeStyles((theme) => {
        return {
            drawer: {
                width: drawerWidth
            },
            drawerPaper: {
                width: drawerWidth,
            },
            title:{
                padding: theme.spacing(2)
            }
            
        }
    })

    const classes = useStyles();



    return (
        <Drawer
            className = {classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{ paper: classes.drawerPaper }}
        >
            <div>
                <Typography variant="h5" className={classes.title}>
                    CollaborApp
                </Typography>
            </div>
            { isLogged &&
            <List>
                <ListItemButton 
                    key={"my-tasks"} 
                    onClick = {(e) => navigate("/") }
                    selected = {location.pathname === "/"}
                >
                    <ListItemIcon > <SubjectOutlined color="secondary"/></ListItemIcon>
                    <ListItemText primary="My Tasks"/>
                </ListItemButton>
                <ListItemButton 
                    key={"create-task"} 
                    disabled = {currentTeam ? false: true}
                    onClick = {(e) => navigate("/createtask") }
                    selected = {location.pathname === "/createtask"}
                >
                    <ListItemIcon > <AddCircleOutlined color="secondary"/></ListItemIcon>
                    <ListItemText primary="Add Task"/>
                </ListItemButton>
                <ListItemButton 
                    key={"create-team"} 
                    
                    onClick = {(e) => navigate(`/createteam`) }
                    selected = {location.pathname === '/createteam'}
                >
                    <ListItemIcon > <AddCircleOutlined color="secondary"/></ListItemIcon>
                    <ListItemText primary="Create new Team"/>
                </ListItemButton>
            </List> }

        </Drawer>

    );
}


const mapStateToProps = (state) => {
    return {
        currentTeam: state.team.currentTeam,
        isLogged: state.auth.isLogged
    }
}

export default connect(mapStateToProps)(SideMenu);