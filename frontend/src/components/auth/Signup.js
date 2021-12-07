import { Button, Container, TextField, Typography } from "@mui/material";
import React  from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { signUp } from "../../store/auth/authActions";

class SignUp extends React.Component {
    state= {
        email: '',
        password: '',
        username: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
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
                <h2>Sign Up</h2>
                
                <form onSubmit={this.handleSubmit}>
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
                    />
                    <TextField 
                        id="username"
                        sx={fieldStyle}
                        label="Username"
                        variant="standard"
                        required
                        fullWidth
                        onChange={this.handleChange}
                    />
                    {authError && <Typography className='login-error'>{authError}</Typography>}
                    <Button 
                        type="submit"
                        variant="contained"
                        color="secondary"
                    >Register</Button>
                </form>
                <Typography>
                    Already have an account? <NavLink to="/signin">Log In</NavLink>
                </Typography>
        </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError
    };
}
 
export default connect(mapStateToProps , mapDispatchToProps)(SignUp);