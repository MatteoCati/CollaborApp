import React, { Component, createRef } from 'react';
import TasksList from './TasksList';
import { connect } from 'react-redux';
import { getTasks } from '../../store/actions/taskActions';
import { getTeams, setCurrentTeam } from '../../store/actions/teamActions';
import { selectCurrentTeamTasks } from '../../store/selectors/taskSelectors';
import { Navigate } from "react-router-dom";

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Tooltip from "@mui/material/Tooltip";
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Box } from '@mui/system';


class Dashboard extends Component {
    constructor(props){
        super(props);
        this.props.loadTasks();
        this.props.loadTeams()
        

        const {teams, currentTeam} = this.props;
        
        // Set Index To the current Team
        let selected = 0;
        if( currentTeam && teams){
            teams.find((team, idx) => {
                if(team._id === currentTeam._id){
                    selected = idx+1;
                    return true;
                } 
                return false;
            });
        } 
        
        this.state = {
            showActive: true,
            open: false,
            anchorRef: createRef(),
            selectedIndex: selected,
            redirect: false
        }

         
    }


    

    handleChangeActive = (event, newActive) => {
        this.setState({...this.state, showActive: (event.target.value === "active")});
    }

    handleClick = (e) =>  {
        //console.log(this.props.teams[this.state.selectedIndex-1]);
        this.setState({...this.state, redirect: true})
    }

    handleMenuItemClick = (event, index) => {
        this.setState({...this.state, selectedIndex: index, open: false});
        this.props.changeTeam(this.props.teams[index-1]._id);
    }
    
    handleToggle = () => {
        this.setState({...this.state, open: !this.state.open});
    }
    
    handleClose = (event) => {
        if (this.state.anchorRef.current && this.state.anchorRef.current.contains(event.target)) {
          return;
        }
        this.setState({...this.state, open: false});
    }

    render(){
        const { teams, currentTeam } = this.props;

        if(this.state.redirect){
            return <Navigate to={`/teams/${currentTeam._id}`} />
        }

        var teamNames = ["unselected"]
        if(teams){
            for(let team of teams){
                teamNames.push(team.name)
            }
        }

        
        return (
            <div className="home">
                <h1>My Tasks</h1>
                
                <ButtonGroup  variant="contained" ref={this.state.anchorRef} aria-label="split button">
                    {this.state.selectedIndex === 0 ?
                        <Button 
                        disabled
                        >{teamNames[this.state.selectedIndex]}</Button>
                    :
                    <Tooltip title="Manage team">
                        <Button 
                            onClick={this.handleClick} 
                           
                        >{teamNames[this.state.selectedIndex]}</Button>
                    </Tooltip>}
                    <Button
                    size="small"
                    aria-controls={this.state.open ? 'split-button-menu' : undefined}
                    aria-expanded={this.state.open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={this.handleToggle}
                    >
                    <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>
                <Popper
                    open={this.state.open}
                    anchorEl={this.state.anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                        transformOrigin:
                            placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                        <ClickAwayListener onClickAway={this.handleClose}>
                            <MenuList id="split-button-menu">
                            {teamNames.map((team, index) => (
                                <MenuItem
                                key={team}
                                disabled = {index === 0}
                                selected={index === this.state.selectedIndex}
                                onClick={(event) => this.handleMenuItemClick(event, index)}
                                >
                                {team}
                                </MenuItem>
                            ))}
                            </MenuList>
                        </ClickAwayListener>
                        </Paper>
                    </Grow>
                    )}
                </Popper>

                
                <Box m = {20}  sx= {{display: "inline", justifyContent: "center"}} >
                <ToggleButtonGroup 
                    onClick={this.handleChangeActive} 
                    value={this.state.showActive ? "active" : "completed"} 
                    exclusive={true}
                    color="primary"
                    style = {{ml: 2}}
                >
                    <ToggleButton 
                        value={"active"} key={"active"}
                        >Active</ToggleButton>
                    <ToggleButton 
                        value={"completed"} key={"completed"}
                    >Completed</ToggleButton>
                </ToggleButtonGroup>
                </Box>
                <Box m = {2}>
                {this.state.showActive ?
                <TasksList tasks={this.props.tasks.filter(task => !task.completed)}/>
                :
                <TasksList tasks={this.props.tasks.filter(task => task.completed)}/>
                }  
                </Box>  
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks : selectCurrentTeamTasks(state),
        teams: state.team.teams,
        currentTeam: state.team.currentTeam,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadTasks: () => dispatch(getTasks()), 
        loadTeams: () => dispatch(getTeams()),
        changeTeam: (team) => dispatch(setCurrentTeam(team)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);