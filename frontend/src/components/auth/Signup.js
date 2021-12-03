import React  from "react";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";

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
        return (
        <div className="login-signup">
            <div className="create">
                <h2>Sign Up</h2>
                
                <form onSubmit={this.handleSubmit}>
                    <label>Email:</label>
                    <input required type="email"
                        id = "email"
                        onChange= {this.handleChange}
                    />  
                    <label>Password:</label>
                    <input required type="password"
                        id = "password"
                        onChange= {this.handleChange}
                    />  
                    <label>Username:</label>
                    <input required type="text"
                        id = "username"
                        onChange= {this.handleChange}
                    />  
                    {authError && <p className='login-error'>{authError}</p>}
                    <button>Register</button>
                </form>
            </div>
        </div>
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