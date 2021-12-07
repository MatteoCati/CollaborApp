import { Button, Container, TextField, Typography } from "@mui/material";
import React  from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom"
import { logIn } from  '../../store/auth/authActions';
class LogIn extends React.Component {
    state= {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.logIn(this.state);
    }

    // {emailError.length > 0 && <p className='login-error'>{emailError}</p>}
    render() { 

        const {authError} = this.props;
        
        const fieldStyle = {
            m: 2,
            display: "block",
        }

        return (
        <Container>
                <Typography variant="h6" component="h2" color="textSecondary">Log In</Typography>
                <form onSubmit={this.handleSubmit}>
                    {authError && <Typography color="error">{authError}</Typography>}
                    <TextField 
                        id="email"
                        sx={fieldStyle}
                        label="Email"
                        variant="standard"
                        required
                        fullWidth
                        onChange={this.handleChange}
                        error = {authError !== ''}
                    />
                    <TextField 
                        id="password"
                        sx={fieldStyle}
                        label="Password"
                        variant="standard"
                        type="password"
                        required
                        fullWidth
                        onChange={this.handleChange}
                        error = {authError !== ''}
                    />
                    <Button 
                        type="submit"
                        variant="contained"
                        color="secondary"
                    >Login</Button>
                </form>
                <Typography>
                    First time here? <NavLink to="/signup">Register</NavLink>
                </Typography>
        </Container>
        );
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (credentials) => dispatch(logIn(credentials))
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);