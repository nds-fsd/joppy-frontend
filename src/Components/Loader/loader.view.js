import React from 'react';
import { ReactComponent as Spinner } from '../../Images/Spinner.svg';
import styles from './loader.module.css';

const Loader = () => (
  <div className={styles.container}>
    <div className={styles.spinnerContainer}>
      <Spinner className={styles.Loaderspinner} />
    </div>
  </div>
);

export default Loader;
