import React, { useState, useEffect, useContext } from 'react';
import ChannelsAPI from '../services/channelsAPI';
import MessengerPage from './MessengerPage';
import UserContext from '../contexts/UserContext';



const ChannelsPage = () => {
  const { user, setUser } = useContext(UserContext);
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
  
  //Récupération de tous les channels au chargement
  const fetchChannels = async () => {
    try {
      const data = await ChannelsAPI.findAll();
      setChannels(data);
    } catch (error) {
      console.log(error); 
    }
  };
  
  //Récupére le channel par id
  const getChannel = async idChannel => {
    try {
      const {id, name, createdAt, messages} = await ChannelsAPI.find(idChannel)
      setChannel({id, name, createdAt, messages})
    } catch (error) {
      console.log(error)
    }
  }

  //"OnClick" On Récupére l'id du channel pour récupérer le channel
  const changeChannel = event => {
    event.preventDefault()
    const getId = event.target.closest("button");
    const id = getId.getAttribute('data-id');
    getChannel(id);
  };

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
        <h1 >Choisire un channel ou crée un nouveau</h1>
      </div>
      ) || (
        <MessengerPage id={channel.id} channelName={channel.name} msg={channel.messages ?? []}/>
      )}
    </div>
    </>
  );
}
 
export default ChannelsPage;