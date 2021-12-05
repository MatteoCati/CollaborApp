import { connect } from 'react-redux';
import LoggedInLinks from "./LoggedInLinks";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Typography } from '@mui/material';
import {format } from "date-fns"

const Navbar = (props) => {
    const { auth, drawerWidth } = props;
    
    return (
        <AppBar style= {{width: `calc(100% - ${drawerWidth}px)`}} elevation={0}>
            <Toolbar>
                <Typography style = {{flexGrow: 1}}>
                    Today is the {format(new Date(), 'do MMMM Y')}
                </Typography>
                { auth.isLogged ? <LoggedInLinks/> :null }
            </Toolbar>
        </AppBar>
    );
   
}
 
const mapStateToProps = (state) => {
    //console.log("Navbar - Current state:", state);
    return { auth: state.auth }
}

export default connect(mapStateToProps)(Navbar);
