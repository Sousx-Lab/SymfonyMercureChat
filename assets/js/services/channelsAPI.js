import axios from 'axios';
import { CHANNELS_API } from './config';

const findAll = () => {
    return axios.get(CHANNELS_API)
           .then(response => {
            const channels = response.data['hydra:member'];
            return channels;
        });
};

const find = (id) => {
    return axios.get(CHANNELS_API + "/" + id)
           .then(response => {
            const channel = response.data;
            return channel

        });
};

export default {
    findAll,
    find
}