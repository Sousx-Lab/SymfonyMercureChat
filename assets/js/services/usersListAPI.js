import axios from 'axios';
import {ADD_USER_LIST_API, GET_USERS_LIST_API} from './config';

const add = (user) => {
    return axios
           .post(ADD_USER_LIST_API, user)
           .then(response => {
            const usersList = response.data;
            return usersList
           });
}

const get = () => {
    return axios
           .get(GET_USERS_LIST_API)
           .then(response => {
            const usersList = response.data;
            return usersList;
        });
}


export default{
    add,
    get
}