import axios from 'axios';
import { REGISTER_API } from './config';

function register(user){
    return axios
           .post(REGISTER_API, user);

}

export default {
    register
}