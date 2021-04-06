import styles from "./navbar.module.css";
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  OFFER_PAGE,
  PROFILE_PAGE,
  CHALLENGES_PAGE,
  CONVERSATIONS_PAGE,
} from "../../Routers/routers";

const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.profileAndChallenges}>
        <Link to={PROFILE_PAGE} className={styles.navButton}>
          <FontAwesomeIcon icon='user' />
        </Link>
        <span className={styles.navButton}> | </span>
        <Link to={CHALLENGES_PAGE} className={styles.navButton}>
          <FontAwesomeIcon icon='circle-notch' />
        </Link>
      </div>

      <Link to={OFFER_PAGE} className={styles.navButtonCenter}>
        <FontAwesomeIcon icon='layer-group' />
      </Link>
      <Link to={CONVERSATIONS_PAGE} className={styles.navButton}>
        <FontAwesomeIcon icon={["far", "comment-alt"]} />
      </Link>
    </div>
  );
};

export default NavBar;
