import { connect } from 'react-redux';
import { logOut } from '../../store/auth/authActions';
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

const LoggedInLinks = (props) => {
    const [anchorElUser, setAnchorElUser] = useState(null);


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    

    return (
        <>
        <Typography>{props.user.username}</Typography>

        <Box sx={{ flexGrow: 0, ml: 2 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem key={"logout"} onClick={props.logOut}>
                  <Typography textAlign="center">Log Out</Typography>
                </MenuItem>
            </Menu>
          </Box>
        </>
    )
   
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(logOut())
    };
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoggedInLinks);