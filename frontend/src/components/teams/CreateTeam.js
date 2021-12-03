import React  from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { createTeam } from "../../store/actions/teamActions";

class CreateTeam extends React.Component {
    state= {
        name: '',
        toHome: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createTeam({ name: this.state.name });
        this.setState({...this.state, toHome: true});
    }

    render() { 
        if(this.state.toHome){
            return <Navigate to="/"/>
        }

        return (
            <div className= 'create'>
                <h2>Create a new Team</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Team name:</label>
                    <input
                        type="text"
                        required
                        id = "name"
                        onChange={this.handleChange}
                    />
                    <button>Create Team</button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTeam: (team) => dispatch(createTeam(team))
    };
}
 
export default connect(null, mapDispatchToProps)(CreateTeam);