import React, { useState, useEffect, useContext } from 'react';
import ChannelsAPI from '../services/channelsAPI';
import MessengerPage from './MessengerPage';
import Field from '../components/forms/Field';
import usersListAPI from '../services/usersListAPI';
import { MERCURE_URL } from '../services/config';

const ChannelsPage = () => {
  
  const [allUsers, setAllUsers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [channel, setChannel] = useState({
    id:"",
    name:"",
    createdAt:"",
    messages:[{
      id:"",
      content:"",
      createdAt:"",
      sender:[{
        firstname:""
      }]
    }]
  });
  
  /**Récupération de tous les channels au chargement */
  const fetchChannels = async () => {
    try {
      const data = await ChannelsAPI.findAll();
      setChannels(data);
    } catch (error) {
      console.log(error); 
    }
  };

  /**Récupération de la liste des users pour affiché le nombre d'utlisateurs par channel */
  const fetchUsers = async () => {
    try {
      const data = await usersListAPI.get();
      setAllUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  /**Abonnement au mercure server pour l'actualisation de liste des users */
const mercureUsersListSubscriber = () => {
  const url = new URL(MERCURE_URL);
    url.searchParams.append('topic', "users_list");
    const eventSouce = new EventSource(url);
    eventSouce.onmessage = ({ data }) => {
      const parsedData = JSON.parse(data);
      setAllUsers(parsedData);
    }
}
 

  /** Récupére le channel par id  */
  const getChannel = async idChannel => {
    try {
      const {id, name, createdAt, messages} = await ChannelsAPI.find(idChannel)
      setChannel({id, name, createdAt, messages})
    } catch (error) {
      console.log(error)
    }
  }

  /** "OnClick" Récupére l'id du channel avec le 'data-id' pour récupérer le channel */
  const handleChangeChannel = event => {
    event.preventDefault()
    const getId = event.target.closest("button");
    const id = getId.getAttribute('data-id');
    getChannel(id);
  };


  /**Creation d'un nouveau channel */
  const [create, setCreate] = useState(false);
  const createChannel = event => {
    event.preventDefault();
    setCreate(true)
  };
  /** Objet channel */
  const [newChannel, setNewChannel] = useState({
    name:"",
    createdAt: new Date().toISOString()
  });
  /** Gere les erreurs */
  const [errors, setErrors] = useState({
    name:"",
    createdAt:"",

  });

  /**Gere le changement lors de la création du nom du channel */
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setNewChannel({...newChannel, [name]: value})
  };

  /**Submssion du nouveau channel */
  const handleSubmit = async event => {
    event.preventDefault();
    try {
        await ChannelsAPI.create(newChannel);
        getChannel(ChannelsAPI.getNewChannelId());
    } catch (error) {
        setErrors(errors);
    }
  }

  /**Comptes les utilisateurs par channel */
  const countUsers = (id) => {
    let count = [];
      allUsers.forEach(u => {
          if(u.roomid === id){
            count.push(1)
        }
      })
    return count.length;
  }
useEffect(() => {
  fetchChannels();
  fetchUsers();
  mercureUsersListSubscriber();
},[])

return (
    <>
  <div className="row h-100">
    <div className="col-sm-2 channels-list p-2 mr-1">
      {channels && (
      <ul>
        {channels.map(channel => (
          <li key={channel.id}>
            <button className="btn btn-link p-0" data-id={channel.id} onClick={handleChangeChannel}>{channel.name}</button>
            {(!allUsers && (
              <>
                <span className="count-users">0</span>
              </>
            )) || (
              <>
              <span className="count-users">
                {countUsers(channel.id)}
              </span>
            </>
            )}
          </li>
        ))}
      </ul>
      )}
      </div>
      {!channel.id && (
      <div className="text-center col-sm-8">
        <h3 className="mt-4"> Choisisez un channel ou  
          <button type="button" onClick={createChannel} className="btn btn-primary ml-2">
            créer un nouveau ici
          </button>
        </h3>
        {create && (
          <div className="mt-4">
          <form onSubmit={handleSubmit} >
            <Field 
             label="Nom du Channel :"
              labelClass="col-lg-3"
               divClass="col-lg-12"
                name="name"
                 value={newChannel.name}
                  placeholder="Nom du channel "
                   type="text"
                    onChange={handleChange}
                     error={errors.name}
              />
              <button type="submit" className="btn btn-primary">Créer</button>
          </form>
          </div>
        )}
      </div>
      ) || (
        <MessengerPage id={channel.id} channelName={channel.name} msg={channel.messages ?? []} usersList={allUsers} />
      )}
    </div>
    </>
  );
}
 
export default ChannelsPage;