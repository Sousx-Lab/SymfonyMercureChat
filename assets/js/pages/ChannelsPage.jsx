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
    <div className="menu">
      <div className="channels-list">
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
      </div>
      <h1 className="mb-4 ml-4 text-center">{!channel.name && "Choisire un channel ou crée un nouveau" || channel.name}</h1>
      {channel.id &&
      <MessengerPage id={channel.id} msg={channel.messages ?? []}/>}
    </>
  );
}
 
export default ChannelsPage;