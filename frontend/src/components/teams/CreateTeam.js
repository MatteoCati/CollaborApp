import { Button, Container, TextField } from "@mui/material";
import React  from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { createTeam } from "../../store/team/teamActions";

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

        const fieldStyle = {
            m: 2,
            display: "block",
        }

        return (
            <Container>
                <h2>Create a new Team</h2>
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                        sx={fieldStyle}
                        label="Name"
                        id="name"
                        variant="standard"
                        required
                        fullWidth
                        onChange={this.handleChange}
                    />
                    <Button variant="contained" type="submit">Create Team</Button>
                </form>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTeam: (team) => dispatch(createTeam(team))
    };
}
 
export default connect(null, mapDispatchToProps)(CreateTeam);