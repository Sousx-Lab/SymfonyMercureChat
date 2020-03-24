import React, { useState, useContext } from 'react';
import authAPI from '../services/authAPI';
import AuthContext from '../contexts/AuthContext';
import Field from '../components/forms/Field';


const LoginPage = ({ history }) => {

    const { setIsAuthenticated } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({
        username:"",
        password:""
    });

    const [error, setError] = useState("");

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setCredentials({...credentials, [name]: value });
    }

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await authAPI.authenticate(credentials)
            setIsAuthenticated(true);
            history.replace("/channels")
        } catch (error) {
            setError("L'adresse email ou le mot de passe est incorrect")
            console.log(error);
        }
    }

    return ( 
       <>
       <div className="container">
        <h3 className="text-center mt-3">Connexion </h3>
        <div className="row d-flex justify-content-center">
        <div className="col-md-6">
        <form className="" onSubmit={handleSubmit}>
           <Field
             label="Adresse Email"
              name="username"
               value={credentials.username}
                placeholder="email@domain.com"
                 type="text"
                  onChange={handleChange}
                   error={error}
            />
            <Field
             label="Mot de passe"
              name="password"
               value={credentials.password}
                placeholder="Votre mot de passe"
                 type="password"
                  onChange={handleChange}
                   error={""}
            />
                <div className="form-group">
                   <button type="submit" className="btn btn-primary">Connexion</button>
                </div>
            </form>
            </div>
            </div>
        </div>
        </>
     );
}
 
export default LoginPage;