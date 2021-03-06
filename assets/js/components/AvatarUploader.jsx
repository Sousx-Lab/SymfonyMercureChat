import React, { useState } from 'react';
import Resizer from 'react-image-file-resizer';
import { Avatar_Path, UI_Avatar } from '../services/config';
import avatarAPI from '../services/avatarAPI';


    
const AvatarUploader = ({ user }) => {

    const [avatar, setAvatar] = useState(user.avatar ? Avatar_Path + user.avatar : null);
    /*
     * Gère l'upload et le redimonssionnement de l'image 
     * Utilisation de Resizer, sortie d'image binaire (Blob)
     */
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if(file){
           const filename = file.name;
        Resizer.imageFileResizer(
         file,
            100,100,
             'JPEG',
                 100, 0,
                uri => {
                  awaitToUploadPic(uri, filename)
                },
            'blob'
           );
        }
       
    };
  
  /*
  * Set la nouvelle image uploader pour l'affiché instantanement &
  * setUploadedFile pour la récuperer dans le handleSubmit dans la UserPage avec getUploadedFile.
  */
  const awaitToUploadPic = (uri, filename) => {
    setAvatar(URL.createObjectURL(uri));
    avatarAPI.setUploadedFile(uri, filename)
  }
    return (
     <div className="col-md-3">
        <div className="text-center">
          <img src={!avatar && UI_Avatar + "+" + user.firstname + "+" + user.lastname || avatar } className="rounded-circle" alt="avatar" />
           <h6>Upload a different photo...</h6>
   <input 
     type="file"
       className="form-control" 
         onChange={handleFileChange}
        />
       </div>
     </div>
      );
}
 
export default AvatarUploader;