import './App.css';
import Login from './Pages/auth/Login';
import Home from './Pages/home/Home';
import Profile from './Pages/Profile/Profile';
import Register from './Pages/register/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './context/Authcontext';

function App() {
  const {user}=useContext(AuthContext)
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Home />:<Register/>}
          </Route>
          <Route path="/profile/:username">
            <Profile />
          </Route>
          <Route path="/login">
            {user ? <Redirect to="/"/>:<Login/>}
          </Route>
          <Route path="/register">
            {user ? <Redirect to="/"/>:<Register/>}
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
