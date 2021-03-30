import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from './buttonAccept.module.css';


const ButtonAccept = ({icon, onClick}) => {

    
    return (

        <div className={styles.button_accept} onClick={onClick}>
                < FontAwesomeIcon icon={icon} className={styles.thumbs_up}/>
              <p>Accept</p>
        </div>
    )
}

export default ButtonAccept;