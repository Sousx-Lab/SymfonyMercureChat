import axios from 'axios';
import { MESSAGE_API, CHANNELS_API } from './config';

const send = (messages) => {
    return axios.post(MESSAGE_API, messages)
    
};

const find = (id) => {
    return axios.get(CHANNELS_API + "/" + id + "/messages")
                .then(response => {
                const messages = response.data['hydra:member'];
                return messages;
        });
};

export default {
    send,
    find
}