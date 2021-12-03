import Dashboard from "./components/tasks/Dashboard";
import Navbar from"./components/layout/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskDetails from "./components/tasks/TaskDetails";
import TeamDetails from "./components/teams/TeamDetails";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import LogIn from "./components/auth/Signin";
import SignUp from "./components/auth/Signup";
import CreateTask from "./components/tasks/CreateTask";
import CreateTeam from "./components/teams/CreateTeam"; 
import { useEffect } from "react";
import { connect } from "react-redux";
import { isLoggedIn } from "./store/actions/authActions";

function App(props) {


  
  useEffect(() => {
    props.checkLoggedIn();
  }, [props]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={ <PrivateRoute ifLogged={true} to="/signin"> <Dashboard/> </PrivateRoute> } />
            <Route path='/createtask' element={<PrivateRoute ifLogged={true} to="/signin"> <CreateTask/> </PrivateRoute> }/>
            <Route path='/tasks/:id' element={<PrivateRoute ifLogged={true} to="/signin"> <TaskDetails /> </PrivateRoute> }/>
            <Route path='/createteam' element={<PrivateRoute ifLogged={true} to="/signin"> <CreateTeam/> </PrivateRoute> }/>
            <Route path='/teams/:id' element={<PrivateRoute ifLogged={true} to="/signin"> <TeamDetails /> </PrivateRoute> }/>
            <Route path='/signin' element={<PrivateRoute ifLogged={false} to="/"><LogIn/></PrivateRoute> } />
            <Route path= '/signup' element={<PrivateRoute ifLogged={false} to = "/"><SignUp/></PrivateRoute> } />
            <Route path="*" element = { <NotFound/>}/>
          </Routes>
        </div>
      </div>
    </Router>
    
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkLoggedIn: () => dispatch(isLoggedIn())
  }
}

export default connect(null, mapDispatchToProps)(App);
