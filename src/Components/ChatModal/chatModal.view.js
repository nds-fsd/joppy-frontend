import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './chatModal.module.css';
import Modal from '../Modal';

// messageArray luego vendrá de backend y myId será el id de usuario en el contexto, por ahora está asi para probar el estilo
// userId será el ID del usuario con quien quieras hablar

const ChatModal = ({ handleClose, userId }) => {
  const myId = '123';
  const messageArray = [
    {
      text: 'Hola',
      user: userId,
    },
    {
      text: 'Que tal?',
      user: userId,
    },
    {
      text: 'How’s life?',
      user: userId,
    },
    {
      text: '😁',
      user: userId,
    },
    {
      text: '🐔',
      user: userId,
    },
    {
      text: 'Hola',
      user: myId,
    },
    {
      text: 'I’m fine how about you?',
      user: myId,
    },
    {
      text: '😊',
      user: myId,
    },
    {
      text: '🤑',
      user: myId,
    },
    {
      text: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore',
      user: myId,
    },
    {
      text: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis',
      user: userId,
    },
  ];
  useEffect(() => console.log(userId), []);
  return (
    <Modal handleClose={handleClose} style={{ width: '40vw', 'max-height': '90vh' }}>
      <div className={styles.container}>
        <div className={styles.nav}>
          <p className={styles.userName}>John Doe</p>
          <button type="button" onClick={handleClose} className={styles.closeButton}>
            <FontAwesomeIcon icon="times" size="lg" />
          </button>
        </div>
        <div className={styles.chatWindow}>
          {messageArray &&
            messageArray.map((message) => (
              <div
                className={
                  message.user !== myId ? `${styles.message}` : `${styles.message} ${styles.mine}`
                }
              >
                {message.text}
              </div>
            ))}
        </div>
        <div className={styles.inputRow}>
          <input type="text" placeholder="Type a message" className={styles.textInput} />
          <button type="button" className={styles.sendButton}>
            <FontAwesomeIcon icon="paper-plane" size="lg" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ChatModal;
