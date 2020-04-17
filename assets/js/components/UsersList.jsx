import React,{useEffect, useState} from 'react';
import usersListAPI from '../services/usersListAPI';
import { MERCURE_URL, DEL_USER_LIST_API } from '../services/config';


const UsersList = ({ channelid , user, users }) => {

  /**Liste users */
  const [usersList, setUsersList] = useState(users);

  /**Info user à envoyer */
  const userInfo = {
    roomid: channelid,
    userid: user.id,
    username: user.firstname,
  };

  /**Envois les infos user pour l'ajouter a la liste des users */
  const setUsersToList = async () => {
    try {
       await usersListAPI.add(userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  /**Abonnement au mercure server pour la mise à jours de la liste des users */
  const mercureUsersListSubscriber = () => {
    const url = new URL(MERCURE_URL);
      url.searchParams.append('topic', "users_list");
      const eventSouce = new EventSource(url);
      eventSouce.onmessage = ({ data }) => {
        const parsedData = JSON.parse(data);
        setUsersList(parsedData);
      }
  }

  /** Supprime l'utilisateur de la list users a la fermeture de la fenetre */
  window.onunload = e =>{
    navigator.sendBeacon(DEL_USER_LIST_API, JSON.stringify({userid: user.id, username: user.firstname}));
  }

  /**On renvois les infos user au changement du channel
   * On actualise la liste reçu par mercure server
  */
  useEffect(() => {
    setUsersToList();
    mercureUsersListSubscriber();
  },[channelid]);
  
return (
    <>
       <div className="col h-100 users-list">
        {usersList && (
            <ul>
              {usersList.map(u => (  
                <li key={u.userid}>
                  {u.roomid === channelid &&(
                     <span className="username">{u.username}</span>
                  )}
                 </li>
                ))}
            </ul>
            )}
        </div>
     </>
    );
}
    
export default UsersList;