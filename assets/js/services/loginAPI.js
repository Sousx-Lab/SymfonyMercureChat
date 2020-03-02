import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { LOGIN_API} from './config';
import User from './user';


function logout(){
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

/**
 * HTTP request authentication
 * @param {obj} credentials 
 */
function authenticate(credentials){
    return axios
           .post(LOGIN_API, credentials)
           .then(response => response.data.token)
           .then(token => {
               window.localStorage.setItem("authToken", token);
               setAxiosToken(token);
               User.set(jwtDecode(token));
           })
}

/**
 * Define header Authorization axios
 * @param {string} token 
 */
function setAxiosToken(token){
    axios.defaults.headers["Authorization"] = "Bearer " + token; 
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
    logout
}