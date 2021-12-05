import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { makeStyles } from "@mui/styles";




const drawerWidth = 240;

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

    

    const classes = useStyles();

    return (
        <div className={classes.root}>

            <Navbar drawerWidth={drawerWidth}/>
            
            <SideMenu drawerWidth={drawerWidth}/> 
           

            <div className={classes.page}>
                <div className= {classes.toolbar}></div>
                {children}
            </div>
            
        </div>
    )
}


export default Layout;