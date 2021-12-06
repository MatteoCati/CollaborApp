import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";






const useStyles = makeStyles((theme) =>{
        return {
        root: {
            display: 'flex'
        },
        page: {
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3)
        },
        toolbar:theme.mixins.toolbar
    }
})

const Layout = ({ children, auth }) => {

    const drawerWidth = auth.isLogged ? 240 : 0;

    const classes = useStyles();

    return (
        <div className={classes.root}>

            <Navbar drawerWidth={drawerWidth}/>
            
            {auth.isLogged && <SideMenu drawerWidth={drawerWidth}/> }
           

            <div className={classes.page}>
                <div className= {classes.toolbar}></div>
                {children}
            </div>
            
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
} 

export default connect(mapStateToProps)(Layout);