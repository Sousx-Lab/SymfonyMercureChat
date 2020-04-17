import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { LOGIN_API, DEL_USER_LIST_API } from './config';
import User from './user';


function logout(id, username){
    navigator.sendBeacon(DEL_USER_LIST_API, JSON.stringify({userid: id, username: username}));
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("refreshToken")
    delete axios.defaults.headers["Authorization"];
}

/**
 * Define header Authorization axios
 * @param {string} token 
 */
function setAxiosToken(token){
    axios.defaults.headers["Authorization"] = "Bearer " + token; 
}

/**
 * HTTP request authentication
 * @param {obj} credentials 
 */
function authenticate(credentials){
    return axios
           .post(LOGIN_API, credentials)
           .then(response => {
            const token = response.data.token
            const refresh_token = response.data.refresh_token
              window.localStorage.setItem("authToken", token);
              window.localStorage.setItem("refreshToken", refresh_token);
                setAxiosToken(token);
                  User.set(jwtDecode(token));
        })   
}

/**
 * Chek if token exist on start up
 */
function setUp(){
    const token = window.localStorage.getItem("authToken");
    if(token){
        const jwtData = jwtDecode(token)
        if(jwtData.exp * 1000 > new Date().getTime()){
            setAxiosToken(token);
            User.set(jwtData);
            return true;
        }
    }
}

/**
 * Check id user Authenticated
 */
function isAuthenticated(){
    if(setUp()){
        return true;
    }
    return false;
}



export default {
    authenticate,
    setUp,
    isAuthenticated,
    logout,
    setAxiosToken
}