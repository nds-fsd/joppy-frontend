import React, { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './chatModal.module.css';
import Modal from '../Modal';
import { fetchMeStuff } from '../../Utils/functions';
import { API_URL } from '../../Routers/routers';
import { getUserToken } from '../../Utils/Auth';
import UserContext from '../../Contexts/userContext';
import { useSocket } from '../../Utils/Socket';
// import { useChatContext } from '../../Contexts/chatContext';

const ChatModal = ({ handleClose, userId }) => {
  const [messageArray, setMessageArray] = useState();
  const [activeChat, setActiveChat] = useState();
  const [refresh, setRefresh] = useState(true);
  const [userName, setUserName] = useState('');
  const { userInfo } = useContext(UserContext);
  const { subscribeIncomingMessage, joinChat } = useSocket();
  const [messageText, setMessageText] = useState();

  const options = {
    method: 'POST',
    headers: new Headers({
      Accept: 'apllication/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${getUserToken()}`,
    }),
    mode: 'cors',
    body: JSON.stringify({ chatMembers: [userId] }),
  };

  const options2 = {
    headers: new Headers({
      Accept: 'apllication/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${getUserToken()}`,
    }),
    mode: 'cors',
  };

  const options3 = {
    method: 'POST',
    headers: new Headers({
      Accept: 'apllication/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${getUserToken()}`,
    }),
    mode: 'cors',
    body: JSON.stringify({ text: messageText }),
  };

  useEffect(() => {
    if (activeChat) {
      joinChat(activeChat._id);

      subscribeIncomingMessage(() => {
        setRefresh(true);
      });
    }
  }, []);

  useEffect(() => {
    fetchMeStuff(`${API_URL}/chat/search`, options, (responseExisting) => {
      if (responseExisting.length > 0) {
        setActiveChat(responseExisting[0]);
        setUserName(responseExisting[0].users.filter((u) => u._id !== userInfo._id)[0].name);
        fetchMeStuff(`${API_URL}/message/${responseExisting[0]._id}`, options2, setMessageArray);
      } else {
        fetchMeStuff(`${API_URL}/chat`, options, (responseNew) => {
          setActiveChat(responseNew);
          setUserName(responseNew.users.filter((u) => u._id !== userInfo._id)[0].name);
          fetchMeStuff(`${API_URL}/message/${responseNew._id}`, options2, setMessageArray);
        });
      }
    });
  }, []);

  useEffect(() => {
    if (refresh) {
      if (activeChat) {
        fetchMeStuff(`${API_URL}/message/${activeChat._id}`, options2, (res) => {
          setMessageArray(res);
          setRefresh(false);
        });
      }
    }
  }, [activeChat, refresh]);

  const handleOnChange = (e) => {
    setMessageText(e.target.value);
  };

  const handleSendMessage = (e) => {
    if (messageText !== '') {
      e.preventDefault();
      fetchMeStuff(`${API_URL}/message/${activeChat._id}`, options3, () => {
        setMessageText('');
        setRefresh(true);
      });
    }
  };

  return (
    <Modal handleClose={handleClose} style={{ width: '40vw', 'max-height': '90vh' }}>
      <div className={styles.container}>
        <div className={styles.nav}>
          <p className={styles.userName}>{userName}</p>
          <button type="button" onClick={handleClose} className={styles.closeButton}>
            <FontAwesomeIcon icon="times" size="lg" />
          </button>
        </div>
        <div className={styles.chatWindow}>
          {messageArray &&
            messageArray.map((message) => (
              <div
                className={
                  message.user._id !== userInfo._id
                    ? `${styles.message}`
                    : `${styles.message} ${styles.mine}`
                }
              >
                {message.text}
              </div>
            ))}
        </div>
        <div className={styles.inputRow}>
          <input
            type="text"
            placeholder="Type a message"
            value={messageText}
            onChange={handleOnChange}
            className={styles.textInput}
          />
          <button type="button" className={styles.sendButton} onClick={handleSendMessage}>
            <FontAwesomeIcon icon="paper-plane" size="lg" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ChatModal;
