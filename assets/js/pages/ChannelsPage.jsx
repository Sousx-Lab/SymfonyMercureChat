import React, { useState, useEffect } from 'react';
import ChannelsAPI from '../services/channelsAPI';
import MessengerPage from './MessengerPage';
import Field from '../components/forms/Field';

const ChannelsPage = () => {
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
  const changeChannel = event => {
    event.preventDefault()
    const getId = event.target.closest("button");
    const id = getId.getAttribute('data-id');
    getChannel(id);
  };

  const [create, setCreate] = useState(false);
  const createChannel = event => {
    event.preventDefault();
    setCreate(true)
  };

  /**Creation d'un nouveau channel */
  const [newChannel, setNewChannel] = useState({
    name:"",
    createdAt: new Date().toISOString()
  });

  const [errors, setErrors] = useState({
    name:"",
    createdAt:"",

  });

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setNewChannel({...newChannel, [name]: value})
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
        await ChannelsAPI.create(newChannel);
        getChannel(ChannelsAPI.getNewChannelId());
    } catch (error) {
        setErrors(errors)
    }
  }

useEffect(() => {
  fetchChannels();
},[])

return (
    <>
  <div className="row h-100">
    <div className="col-sm-2 channels-list p-2 mr-1">
      {channels && (
      <ul>
        {channels.map(channel => (
          <li key={channel.id}>
            <button className="btn btn-link p-0" data-id={channel.id} onClick={changeChannel}>{channel.name}</button>
          <span className="count-users">{channel.messages.length}</span>
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
        <MessengerPage id={channel.id} channelName={channel.name} msg={channel.messages ?? []}/>
      )}
    </div>
    </>
  );
}
 
export default ChannelsPage;