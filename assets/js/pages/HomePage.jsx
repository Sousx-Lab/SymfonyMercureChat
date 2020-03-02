import React from 'react';
import { NavLink } from 'react-router-dom';

const HomePage = (props) => {
    return (
      <div className="container">
    <div className="jumbotron mt-3">
        <h1 className="display-3">Hello !</h1>
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
