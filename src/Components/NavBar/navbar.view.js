import styles from './navbar.module.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { OFFER_PAGE, PROFILE_PAGE, CHALLENGES_PAGE, CONVERSATIONS_PAGE } from "../../Routers/routers";



const NavBar = () => {

    return(
        <div className={styles.navbar}>
            <Link to={PROFILE_PAGE} className='profile_link'>
              Prof
            </Link>
          
            <Link to={CHALLENGES_PAGE} className='challenges_link'>
              Chall
            </Link>
       
            <Link to={OFFER_PAGE} className='offer_link'>
              Offers
            </Link>
            <Link to={CONVERSATIONS_PAGE} className='conversations_link'>
              Conv
            </Link>
        </div>
    )
}

export default NavBar;