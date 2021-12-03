//import isAuthenticated from '../hooks/useAuth';
//import { useEffect, useState } from 'react';
import {Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = (props) => {
    return (
            props.auth.isLogged === props.ifLogged
            ? props.children
            : <Navigate to={props.to} />
    )
}

const mapStateToProps = (state) =>{
    return { auth: state.auth};
}

export default connect(mapStateToProps)(PrivateRoute);

  
