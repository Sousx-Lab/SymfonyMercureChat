import React, { useState, useEffect, useContext } from 'react';
import messagesAPI from '../services/messagesAPI';
import { MERCURE_URL, API_URL } from '../services/config';
import UserContext from '../contexts/UserContext';
import { Avatar_Path, UI_Avatar } from '../services/config';
import UsersList from '../components/UsersList';

const MessengerPage = ({ id, channelName, msg, usersList }) => {

  const { user } = useContext(UserContext);

  const [messages, setMessages] = useState(msg);
    
  const [message, setMessage] = useState({
    content: "",
    createdAt: new Date().toISOString(),
    room: "",
    sender: "api/users/" + user.id
  });
    
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setMessage({ ...message, [name]: value })
  };
    
    //Reset les valeurs de l'input 
  const resetMessage = () => {
    setMessage({
      content: "",
      createdAt: new Date().toISOString(),
      room: "",
      sender: "api/users/" + user.id
    });
  }

  //Envois du message a la base de donnée
  const handleSubmit = async event => {
    event.preventDefault();
    if (message.content.length === 0 || message.content == ' ') return;
    message.room = "api/rooms/" + id;
    try {
      await messagesAPI.send(message)
      resetMessage();
    } catch (error) {
      console.log(error)
    }
  }

  //Recharge les messages au changement de l'id du channel//
  useEffect(() => {
    setMessages(msg);
    mercureMessagesSubscriber();
  },[id]);
  
//Abonnement au flux Mercure server au topic "messages/{id}"
//Parse et traite les messages reçu en temps réel
  const mercureMessagesSubscriber = () => {
    const copyMessages = [...msg]
    const url = new URL(MERCURE_URL);
    url.searchParams.append('topic', API_URL + "messages/{id}");
    const eventSouce = new EventSource(url);
    eventSouce.onmessage = ({ data }) => {
      let parsedMessage = JSON.parse(data);
      if (parsedMessage.room.id === id) {
        copyMessages.push(parsedMessage)
        setMessages(copyMessages);
        resetMessage();
      }
    };
  };

return ( 
     <>
     <div className="col-8 h-100 p-0 section__chat">
          <div 
            className="show-message pt-3 h-75">
              {messages && (
            <div>
            <h1 className="p-2">{channelName}</h1>
              {messages.map((msg,k) => (
                <p key={k}>
                <img src={!msg.sender.avatarPath && UI_Avatar + msg.sender.firstname + "+" + msg.sender.lastname 
                || 
                Avatar_Path + msg.sender.avatarPath} className="rounded-circle avatar-channel" alt="avatar" />
                  <span 
                    className="username">
                    {msg.content &&  
                      msg.sender.firstname + " à " + new Date(msg.createdAt).toLocaleTimeString() + " :"}
                    </span>
                      <span
                      className="message-content">
                        { msg.content}
                          </span>
                      </p>
                    ))}
                </div>
                )}
            </div>
          <div className="form-group">
           <form onSubmit={handleSubmit} className="chat__form">
            <textarea name="content" 
              className="textarea" 
                value={message.content} 
                  onChange={handleChange} 
                    type="text"
              />
            <div className="send__button">
              <button type="submit" className="btn btn-success">Envoyer</button>
            </div>
            
            </form>
          </div>
      </div>
      <UsersList channelid={id} user={user} users={usersList} />
    </>
    );
};

export default MessengerPage;