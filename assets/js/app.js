import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, withRouter} from 'react-router-dom';
import Navbar from './components/Navbar';
import '../css/app.css';
import HomePage from './pages/HomePage';
import ChannelsPage from "./pages/ChannelsPage";
import LoginPage from './pages/LoginPage';
import authAPI from './services/authAPI'
import ProtectedRoute from './components/ProtectedRoute';
import logedUser from './services/user';
import AuthContext from './contexts/AuthContext';
import UserContext from './contexts/UserContext';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';


//import { ToastContainer } from 'react-toastift';


const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated());
    const [user, setUser] = useState(logedUser.get());
    const NavbarWhithRouter = withRouter(Navbar);
    return(
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
    <UserContext.Provider value={{user, setUser}} >
    <HashRouter>
        <NavbarWhithRouter />
    <main className="container-fluid h-100">
    <Switch>
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage}/>
        <ProtectedRoute path="/channels" component={ChannelsPage} />
        <ProtectedRoute path={"/profil/:slug"} component={UserPage} />
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
