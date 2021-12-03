import React, { Component } from 'react';
import TasksList from './TasksList';
import { connect } from 'react-redux';
import { getTasks } from '../../store/actions/taskActions';
import { getTeams, setCurrentTeam } from '../../store/actions/teamActions';
import {NavLink} from "react-router-dom";
import { selectCurrentTeamTasks } from '../../store/selectors/taskSelectors';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.props.loadTasks();
        this.props.loadTeams();

    }

    state = {
        showActive: true,
    }

    handleChange = (e) =>  {
        this.props.changeTeam(e.target.value, this.props.currentTeam);
    }

    render(){
        const { teams, currentTeam } = this.props;

        return (
            <div className="home">
                <h1>My Tasks {currentTeam && "- "+currentTeam.name}</h1>
                <select defaultValue={currentTeam ? currentTeam._id : "unselected"} onChange={this.handleChange}
                    className="select-css"
                >
                <option disabled value="unselected"> -- select an option -- </option>
                {teams.map((team) => <option key={team._id} value={team._id}>{team.name}</option> )}
                </select >
                <div className="choose-active">
                    <span  className="choose-active" 
                    style={this.state.showActive ? {borderBottom: "3px solid red"} : {} } onClick ={() => this.setState({...this.state, showActive: true})}
                    >Active</span>
                    <span className="choose-active" 
                    style={!this.state.showActive ? {borderBottom: "3px solid red"} : {} } onClick ={() => this.setState({...this.state, showActive: false})}
                    >Completed</span>
                </div>
                {this.state.showActive ?
                <TasksList tasks={this.props.tasks.filter(task => !task.completed)}/>
                :
                <TasksList tasks={this.props.tasks.filter(task => task.completed)}/>
                }    
                <div className="create">
                {currentTeam && <NavLink to='/createtask'>Create Task</NavLink>}
                </div>  
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