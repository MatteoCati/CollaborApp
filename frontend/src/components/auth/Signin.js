import React  from "react";
import { connect } from "react-redux";
import { logIn } from  '../../store/actions/authActions';
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
        return (
        <div className="login-signup">
            <div className="create">
                <h2>Log In</h2>
                <form onSubmit={this.handleSubmit}>
                    {authError && <p className='login-error'>{authError}</p>}
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
                    <button>Login</button>
                </form>
            </div>
        </div>
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