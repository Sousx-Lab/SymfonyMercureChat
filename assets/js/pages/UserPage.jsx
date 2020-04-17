import React, { useState, useContext } from "react";
import UserContext from '../contexts/UserContext';
import editUserAPI from '../services/editUserAPI'
import Field from '../components/forms/Field';
import AvatarUploader from "../components/AvatarUploader";
import avatarAPI from "../services/avatarAPI";
import { Link } from "react-router-dom";

const UserPage = ({ history }) => {

  const { user } = useContext(UserContext);

  /**User info editable */
  const [credentials, setCreadentails] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.username,
    avatar: user.avatar,
  });

  /**Gére la checkbox pour le changement du mot de passe */
  const [isChecked, setIsChecked] = useState(false);
  const handleChecked = (event) =>{
    const target = event.target
    const value = target.checked;
    setIsChecked(value);
  }

  /**Gére les messages d'erreurs  */
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  /**Gére les alerts */
  const [alerts, setAlert] = useState({
    state: false,
    type: "success",
    message:""
  });
  
  const handleClose = (event) => {
    setAlert({ state: false, type: "" , message: ""});
  }

  /**Gére les changement formulaire */
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setCreadentails({ ...credentials, [name]: value });
  };

  /**Gére l'envois des données au serveur */
  const handleSubmit = async event => {
    event.preventDefault();

  /**Récupére l'image uploader par l'user */
  const { uri, fileName } = avatarAPI.getUploadedFile();

  /**Vérifie si on à déja un avatar existant, et si user a uploader un avatar
   * dans se cas on supprime l'avatar avant d'uploader le nouveau.
  */
    if(uri !== "" && user.avatarId){
        try {
          await avatarAPI.remove(user.avatarId)
        } catch (error) {
          console.log(error)
        }
        try {
          await avatarAPI.upload(uri, fileName);
        } catch (error) {
          console.log(error);
        }
      };
      if(uri !== "" && user.avatarId === null){
        try {
          await avatarAPI.upload(uri, fileName);
        } catch (error) {
          console.log(error);
        }
    };
    /**Récupere l'avatar Path aprés l'upload, sinon ont insére la valeur existante sinon null */
    credentials.avatar = avatarAPI.getAvatarPath() 
    if(!credentials.avatar && user.avatarId)
    {
      credentials.avatar = "api/user_avatars/" + user.avatarId;
    }else{
      credentials.avatar = avatarAPI.getAvatarPath();
    }
    
    try {
        /**Mise à jours des infos user */
        await editUserAPI.update(user.id, credentials);
        editUserAPI.refreshToken();
        history.replace("/profil/" + credentials.firstname);
        setAlert({ state: true, type: "success" ,message: "Informations successfully changed !"});
    }catch(error){
      const { violations } = error.response.data;
      if (violations) {
        const apiErrors = {}
        violations.map(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message
        });
        setErrors(apiErrors);
        setAlert({
          state: true, type: "danger", message: "Please try to correct the errors"});
      }
    }
  }
 
    return ( 
        <>
        <div className="container">
          <form onSubmit={handleSubmit} className="form-horizontal">
            <h1>Edit Profile</h1>
            <hr />
            <div className="row">
              <AvatarUploader user={user} />
              <div className="col-md-9">
                <h3>Personal info</h3>
          {alerts.state && (
            <div className={"alert alert-dismissible alert-" + alerts.type}>
              <button type="button" onClick={handleClose} className="close" data-dismiss="alert">&times;</button>
                {alerts.message} {alerts.state && ( <Link to="/channels"><strong> Go Channels</strong></Link>)}
            </div>
          )}
        <Field
             label="Firstname :"
              labelClass="col-lg-3"
               divClass="col-lg-8"
                name="firstname"
                 value={credentials.firstname}
                  placeholder="Change your firstname "
                   type="text"
                    onChange={handleChange}
                     error={errors.firstname}
                />
        <Field
             label="Lastname :"
              labelClass="col-lg-3"
               divClass="col-lg-8"
                name="lastname"
                 value={credentials.lastname}
                  placeholder="Change your lastname"
                   type="text"
                    onChange={handleChange}
                     error={errors.lastname}
                />
          <Field
             label="Email :"
              labelClass="col-lg-3"
               divClass="col-lg-8"
                name="email"
                 value={credentials.email}
                  placeholder="Change your email"
                   type="email"
                    onChange={handleChange}
                     error={errors.email}
                />
            <div className="form-group">
          <div className="custom-control custom-switch col-lg-8">
              <input className="custom-control-input" type="checkbox" id="isChecked" checked={isChecked} onChange={handleChecked}/>
              <label className="custom-control-label" htmlFor="isChecked">I want change my password</label>
          </div>
        </div>
        {isChecked && (
          <>
          <Field
             label="New Password :"
              labelClass="col-lg-3"
               divClass="col-lg-8"
                name="password"
                 value={credentials.password}
                  placeholder="New password"
                   type="password"
                    onChange={handleChange}
                     error={errors.password}
                />
           <Field
             label="Confim new password :"
              labelClass="col-lg-3"
               divClass="col-lg-8"
                name="confirmPassword"
                 value={credentials.confirmPassword}
                  placeholder="Confirm your new password"
                   type="password"
                    onChange={handleChange}
                     error={errors.confirmPassword}
                />
                </>
              )}
                <div className="form-group">
                  <label className="col-md-3 control-label"></label>
                  <div className="col-md-8">
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                    <span></span>
                    <button type="reset" className="btn btn-default">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    );
}
 
export default UserPage;