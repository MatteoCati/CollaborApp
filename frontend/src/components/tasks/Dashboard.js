import React, { Component, createRef } from 'react';
import TasksList from './TasksList';
import { connect } from 'react-redux';
import { fetchTasks } from '../../store/task/taskActions';
import { selectCurrentTeamTasks } from '../../store/task/taskSelectors';
import { Navigate } from "react-router-dom";

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import { Tabs, Tab, Typography } from '@mui/material';
import { Box } from '@mui/system';


const fabStyle = {
    position: 'absolute',
    bottom: 32,
    right: 32,
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
}

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.props.loadTasks();        
        
        this.state = {
            open: false,
            anchorRef: createRef(),
            redirectTeam: false,
            redirectCreate: false,
            value: 0,
        }

         
    }

    handleChange = (event, newValue) => {
        this.setState({value: newValue});
    };
    
    handleAddTask = (event) => {
        this.setState({redirectCreate: true});
    }

    render(){
        const { currentTeam } = this.props;

        if(this.state.redirectTeam){
            return <Navigate to={`/teams/${currentTeam._id}`} />
        }
        if(this.state.redirectCreate){
            return <Navigate to={"createtask"} />
        }

        
        return (
            <Box sx={{ width: '100%', mb: 4 }}>
                <Typography variant="h4" component="h2" sx={{mb:2}}>My Tasks</Typography>

                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs 
                            value={this.state.value} 
                            onChange={this.handleChange} 
                            centered
                        >
                            <Tab label="Active" />
                            <Tab label="Completed" />
                        </Tabs>
                    </Box>
                    <TabPanel value={this.state.value} index={0}>
                        <TasksList tasks={this.props.tasks.filter(task => !task.completed)}/>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1}>
                        <TasksList tasks={this.props.tasks.filter(task => task.completed)}/>
                    </TabPanel>
                </Box>
                
                {currentTeam && 
                <Fab sx={fabStyle} color="secondary" onClick={this.handleAddTask}>
                    <AddIcon />
                </Fab>
                }


            </Box>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks : selectCurrentTeamTasks(state),
        currentTeam: state.team.currentTeam,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadTasks: () => dispatch(fetchTasks()), 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);