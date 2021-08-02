import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import authAPI from '../services/authAPI';
import UserContext from '../contexts/UserContext';
import { Avatar_Path, UI_Avatar } from '../services/config';

const Navbar = ({ history }) => {

    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const { user } = useContext(UserContext);
    const handleLogout = () => {
    authAPI.logout(user.id, user.firstname);
    setIsAuthenticated(false);
    history.push("/");
    }
  
return (
 <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <NavLink className="navbar-brand" to="/">ChatSym</NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarColor03">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to="/">Home<span className="sr-only"></span></NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/channels">Channels</NavLink>
        </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Features</a>
      </li>
      </ul>
      <ul className="navbar-nav ml-auto">
      {(!isAuthenticated && (
        <>
        <li className="nav-item">
        <NavLink to="/register" className="btn btn-info mr-2 btn-sm">Nouveau +<i className="fas fa-user-plus"></i>
        </NavLink>
        </li>
      <li className="nav-item mr-2">
        <NavLink to="/login" className="btn btn-success btn-sm">Se Connecter<i className="fas fa-key ml-2"></i></NavLink>
        </li>
        </>
      )) || (
        <>
        <li className="nav-item dropdown mr-3">
        <NavLink to={"/profil/" + user.firstname}>
          <img src={!user.avatar && UI_Avatar + "+" + user.firstname + "+" + user.lastname || Avatar_Path + user.avatar} className="rounded-circle avatar" alt="avatar" />
          </NavLink>
         </li>
          <li className="nav-item">
            <button onClick={handleLogout} className="btn btn-danger">
              Déconnexion !
            </button>
          </li>
        </>
      )}
      </ul>
  </div>
 </nav>
 );
}
 
export default Navbar;