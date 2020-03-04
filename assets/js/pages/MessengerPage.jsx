import React, { useState, useEffect, useContext } from 'react';
import messagesAPI from '../services/messagesAPI';
import { MERCURE_URL, API_URL } from '../services/config';
import UserContext from '../contexts/UserContext';


const MessengerPage = ({ id, channelName, msg }) => {

    const { user } = useContext(UserContext);
    const [messages, setMessages] = useState(msg);     
    const [message, setMessage] = useState({
        content:"",
        createdAt:"",
        room:"",
        sender:"api/users/" + user.id
      });

    const newDate = new Date().toISOString();

    const handleChange = ({currentTarget}) => {
      const {name, value } = currentTarget;
      setMessage({...message, [name]: value})
    };
    
    //Reset les valeurs de l'input 
    const resetMessage = () => {
      setMessage({
        content:"",
        createdAt:"",
        room:"",
        sender:"api/users/" + user.id
      });
    }

    //Envois du message a la base de donnée
    const handleSubmit = async event =>{
      event.preventDefault();
      if(message.content.length === 0 || message.content == ' ') return;
      message.createdAt = newDate;
      message.room = "api/rooms/" + id;
      try {
        await messagesAPI.send(message)
        resetMessage();
     } catch (error) {
        console.log(error)
      }
    }

  //Recharge les messages au changement de l'id du channel
  //
  
  useEffect(() => {
    setMessages(msg);
    mercureSubscribe();
  },[id]);
  
//Suscription au flux Mercure server au topic "messages/{id}"
//Parse et traite les messages reçu en temp réel
const mercureSubscribe = () => {
    const copyMessages = [...msg]
    const url = new URL(MERCURE_URL);
    url.searchParams.append('topic', API_URL + "messages/{id}");
    const eventSouce = new EventSource(url);
    eventSouce.onmessage = ({ data }) => {
      let parsedMessage = JSON.parse(data);
      if(parsedMessage.room.id === id){
          copyMessages.push(parsedMessage)
          setMessages(copyMessages);
          resetMessage();
    }
  };
};
return ( 
     <>
     <div className="col-sm-8 h-100 p-0">
          <div 
            className="show-message pt-3 h-75">
              {messages && (
            <div>
            <h1 className="p-2">{channelName}</h1>
              {messages.map((msg,k) => (
                <p key={k}>
                  <span 
                    className="username">
                    {msg.content &&  
                      msg.sender.firstname + ": "}
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
           <form onSubmit={handleSubmit} >
            <textarea name="content" 
              className="textarea" 
              value={message.content} 
                onChange={handleChange} 
                    type="text"
              />
          <button type="submit" className="btn btn-primary ">Envoyer</button>
            </form>
          </div>
      </div>
    </>
    );
};

export default MessengerPage;