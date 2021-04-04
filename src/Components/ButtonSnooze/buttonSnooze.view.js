import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './buttonSnooze.module.css';


const ButtonSnooze = ({icon, onClick}) => {

    
    return (

        <div className={styles.button_snooze} onClick={onClick}>
               < FontAwesomeIcon icon={icon} className={styles.snooze}/>
              <p>Snooze</p>
        </div>
    )
}

export default ButtonSnooze;