import axios from 'axios';
import { REFRESH_TOKEN_API, REGISTER_API } from './config';
import jwtDecode from 'jwt-decode';
import User from './user';


function update(id, credentials){
    return axios.put(REGISTER_API + "/" + id,  credentials)
}


function setRefreshToken(refreshToken, token){
    window.localStorage.setItem("authToken", token);
    window.localStorage.setItem("refreshToken", refreshToken);
}

/**
 * Get a new Token with refreshToken
 */
function refreshToken(){
    const refreshToken = {
        refresh_token: window.localStorage.getItem("refreshToken")
    }
    if(refreshToken){
      return axios
            .post(REFRESH_TOKEN_API, refreshToken)
            .then(response => {
                setRefreshToken(response.data.refresh_token, response.data.token);
                const jwtData = jwtDecode(response.data.token)
                User.set(jwtData);
            });
    }
}

export default {
    refreshToken,
    update
}