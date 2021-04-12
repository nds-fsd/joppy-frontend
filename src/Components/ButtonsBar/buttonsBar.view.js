import React from 'react';
import styles from './buttonsBar.module.css';
import ButtonAccept from '../ButtonAccept';
import ButtonSnooze from '../ButtonSnooze';
import ButtonReject from '../ButtonReject';
import ButtonShare from '../ButtonShare';

const ButtonsBar = ({ rejectClicked, acceptClicked }) => (
  <div className={styles.buttonsBar}>
    <ButtonReject onClick={rejectClicked} icon="thumbs-down" />
    <ButtonSnooze icon="history" />
    <ButtonShare icon="share" />
    <ButtonAccept onClick={acceptClicked} icon="thumbs-up" />
  </div>
);

export default ButtonsBar;
