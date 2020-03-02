import React, { useState, useEffect, useContext } from 'react';
import messagesAPI from '../services/messagesAPI';
import { MERCURE_URL, API_URL } from '../services/config';
import UserContext from '../contexts/UserContext';


const MessengerPage = ({ id, msg }) => {

    const { user } = useContext(UserContext);
    const [messages, setMessages] = useState(msg);     
    const [message, setMessage] = useState({
        content:"",
        createdAt:"",
        room:"",
        sender:"api/users/" + user.id
      });
    console.log(msg)
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
          resetMessage()
    }
  }


}

return ( 
     <>
     <div className="message">
          <div 
            className="show-message">
              {messages && (
            <div>
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
        </div> 
    <div className="send-message">
           <form onSubmit={handleSubmit}>
            <textarea name="content" 
              value={message.content} 
                onChange={handleChange} 
                  className="form-control" 
                    type="text"
              />
          <button type="submit">Envoyer</button>
       </form>
      </div>
    </>
    );
};

export default MessengerPage;