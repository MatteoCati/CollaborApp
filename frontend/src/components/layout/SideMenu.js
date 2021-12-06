import List from "@mui/material/List";
import { Collapse, Divider, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { SubjectOutlined, AddCircleOutlined, SettingsOutlined }  from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router';
import { connect } from 'react-redux';
import { setCurrentTeam, getTeams} from '../../store/actions/teamActions';





const SideMenu = ({drawerWidth, currentTeam, isLogged, loadTeams, changeTeam, teams}) => {
    const navigate = useNavigate();
    const location = useLocation();
    loadTeams();

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
                    key={"create-team"} 
                    
                    onClick = {(e) => navigate(`/createteam`) }
                    selected = {location.pathname === '/createteam'}
                >
                    <ListItemIcon > <AddCircleOutlined color="secondary"/></ListItemIcon>
                    <ListItemText primary="Create new Team"/>
                </ListItemButton>
                <Divider/>
                {teams.map((team) => (
                    <>
                        <ListItemButton 
                            key={team.name} 
                            onClick = {(e) => {changeTeam(team._id);  navigate("/")} }
                            selected = {currentTeam && currentTeam._id === team._id && 
                                        location.pathname==="/"}
                        >
                            <ListItemIcon > <SubjectOutlined color="secondary"/></ListItemIcon>
                            <ListItemText primary={team.name}/>
                        </ListItemButton>
                        <Collapse 
                            in={currentTeam && currentTeam._id === team._id} 
                            timeout="auto" 
                            unmountOnExit
                        >
                            <List component="div" disablePadding>
                            <ListItemButton 
                                sx={{ pl: 4 }}
                                onClick = {(e) => navigate(`teams/${team._id}`)}
                                selected = {location.pathname === `/teams/${team._id}`}
                            >
                                <ListItemIcon > <SettingsOutlined color="secondary"/></ListItemIcon>
                                <ListItemText  primary="Settings" />
                            </ListItemButton>
                            </List>
                        </Collapse>
                    </>
                ))}
            </List> }

        </Drawer>

    );
}


const mapStateToProps = (state) => {
    return {
        currentTeam: state.team.currentTeam,
        isLogged: state.auth.isLogged,
        teams: state.team.teams,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadTeams: () => dispatch(getTeams()),
        changeTeam: (team) => dispatch(setCurrentTeam(team)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);