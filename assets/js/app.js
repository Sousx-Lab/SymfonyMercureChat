import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, withRouter} from 'react-router-dom';
import Navbar from './components/Navbar';
import '../css/app.css';
import HomePage from './pages/HomePage';
import ChannelsPage from "./pages/ChannelsPage";
import LoginPage from './pages/LoginPage';
import loginAPI from './services/loginAPI';
import ProtectedRoute from './components/ProtectedRoute';
import logedUser from './services/user';
import AuthContext from './contexts/AuthContext';
import UserContext from './contexts/UserContext';
import RegisterPage from './pages/RegisterPage';
//import { ToastContainer } from 'react-toastift';


const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(loginAPI.isAuthenticated());
    const [user, setUser] = useState(logedUser.get());
    const NavbarWhithRouter = withRouter(Navbar);
    return(
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}} >
    <UserContext.Provider value={{user, setUser}} >
    <HashRouter>
        <NavbarWhithRouter />
    <main className="main">
    <Switch>
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage}/>
        <ProtectedRoute path="/channels" component={ChannelsPage} />
        <Route path="/" component={HomePage} />
    </Switch>
    </main>
    </HashRouter>
    </UserContext.Provider>
  </AuthContext.Provider>
    );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
