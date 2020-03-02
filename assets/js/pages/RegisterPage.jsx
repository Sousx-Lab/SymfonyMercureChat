import React, { useEffect, useState } from 'react';
import Field from '../components/forms/Field';
import registerAPI from '../services/registerAPI';



const RegisterPage = ({ history }) => {

    const [user, setUser] = useState({
        firstname:"",
        lastname:"",
        email:"",
        password:"",
        confirmPassword:""
    });
    const [errors, setErrors] = useState("");

    const handleChange = ({currentTarget}) => {
        const { name, value } =  currentTarget;
        setUser({...user, [name]:value})
    }

    const handleSubmit = async event =>{
      event.preventDefault();
       try {
          await registerAPI.register(user);
          history.replace("/login");
       } catch (error) {
          const { violations } = error.response.data;
          if(violations){
            const apiErrors = {};
            violations.map(({propertyPath, message}) => {
              apiErrors[propertyPath] = message
            });
            setErrors(apiErrors);
          }

         
       }
    }
    return (
        <>
        <div className="container">
          <h1 className="text-center">Inscription !</h1>
        <form onSubmit={handleSubmit}>
        <Field
             label="Nom"
              name="firstname"
               value={user.firstname}
                placeholder="Votre Nom"
                 type="text"
                  onChange={handleChange}
                   error={errors}
            />
            <Field
             label="Prénom"
              name="lastname"
               value={user.lastname}
                placeholder="Votre Prénom"
                 type="text"
                  onChange={handleChange}
                   error={errors}
            />
            <Field
             label="Adresse Email"
              name="email"
               value={user.email}
                placeholder="Votre Adresse Email"
                 type="email"
                  onChange={handleChange}
                   error={errors}
            />
            <Field
             label="Mot de passe"
              name="password"
               value={user.password}
                placeholder="Votre Mot de passe"
                 type="password"
                  onChange={handleChange}
                   error={errors}
            />
            <Field
             label="Confirmez le mot de passe"
              name="confirmPassword"
               value={user.confirmPassword}
                placeholder="Confirmez Votre Mot de passe"
                 type="password"
                  onChange={handleChange}
                   error={errors}
            />
            <button type="submit" className="btn btn-primary">C'est parti!</button>
            </form>
          </div>
        </>
     );
}
 
export default RegisterPage;