import axios from 'axios';
import { CHANNELS_API } from './config';

let newChannelid = null;


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

const create = (channel) => {
    return axios
          .post(CHANNELS_API, channel)
          .then(response => {
           setNewChannelId(response.data.id);
        });
}


const setNewChannelId = (id) => {
    return newChannelid = id
}

const getNewChannelId = () => {
    if(newChannelid)
    {
        return newChannelid;
    }
    return null;
}

export default {
    findAll,
    find,
    create,
    getNewChannelId
}