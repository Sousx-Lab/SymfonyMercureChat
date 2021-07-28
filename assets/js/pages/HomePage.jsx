import React, {useEffect, useContext} from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import { DEL_USER_LIST_API } from '../services/config';


const HomePage = (props) => {

  const { user } = useContext(UserContext);

  /** Supprime l'utilisateur de la list users si il reviens sur la Home*/
  const unsetUsertoList = () => {
    navigator.sendBeacon(DEL_USER_LIST_API, JSON.stringify({userid: user.id, username: user.firstname}));
  }
useEffect(() =>{
 unsetUsertoList();
},[])
  navigator.sendBeacon(DEL_USER_LIST_API, JSON.stringify({userid: user.id, username: user.firstname}));
    return (
      <div className="container">
    <div className="jumbotron mt-4">
        <h1 className="display-3">Welcome !</h1>
          <p className="lead">ChatSym est un simple chat textuel en temp réel basé sur <strong>Symfony, Api Platform, Mercure Server et ReactJS...</strong></p>
        <hr className="my-4" />
    <p className="lead">
      <NavLink className="btn btn-primary btn-lg" to="/channels" role="button">Testez Moi !</NavLink>
        </p>
      </div>
    </div>
  );
}
 
export default HomePage;
