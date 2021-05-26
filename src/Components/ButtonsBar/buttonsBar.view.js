import React from 'react';
import styles from './buttonsBar.module.css';
import Button from '../Button';

const ButtonsBar = ({ rejectClicked, acceptClicked, snoozeClicked }) => (
  <div className={styles.buttonsBar}>
    <Button className={styles.reject} handle="Nay" onClick={rejectClicked} icon="thumbs-down" />
    <Button className={styles.snooze} handle="Later" onClick={snoozeClicked} icon="history" />
    <Button className={styles.accept} handle="Yay" onClick={acceptClicked} icon="thumbs-up" />
  </div>
);

export default ButtonsBar;
