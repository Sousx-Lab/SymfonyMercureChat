import axios from 'axios';
import { AVATAR_API } from './config';

const axiosHeader = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

/**
 * File Id after uploaded file by upload method "/users_avatar/<id>"
 */
let avatarPath;

/**
 * URI & Filename 
 */
const uploadedFile = {
    uri:"",
    fileName:""
}

/**
 * File uploader
 * @param {Blob} file 
 * @param {String} filename
 */
function upload(file, filename)
{   const formData = new FormData();
    formData.append('file', file, filename)
            return axios.post(AVATAR_API, formData, axiosHeader)
                .then(response => {
                  setAvatarID(response.data["@id"]);
            });
        
}

/**
 * Avatar remover
 * @param {Integer} id 
 */
function remove(id)
{
    return axios.delete(AVATAR_API + "/" + id);
}

/**
 * Get Uploaded File 
 */
function getUploadedFile()
{
    if(uploadedFile.uri && uploadedFile.fileName)
    {
        return uploadedFile;
    }
    return uploadedFile;
}

/**
 * 
 * @param {Blob} NewUri 
 * @param {String} NewfileName 
 */
function setUploadedFile(NewUri, NewfileName)
{
    return uploadedFile.uri = NewUri,
           uploadedFile.fileName = NewfileName;  
}

/**
 * Get Avatar Path after upload succes
 * @returns String
 */
function getAvatarPath()
{
    if(avatarPath){
        return avatarPath;
    }
    return null;
}

/**
 * @param {String} UpAvatarPath 
 */
function setAvatarID(UpAvatarPath)
{
    return avatarPath = UpAvatarPath;
}

export default {
    upload,
    remove,
    getAvatarPath,
    setUploadedFile,
    getUploadedFile
};