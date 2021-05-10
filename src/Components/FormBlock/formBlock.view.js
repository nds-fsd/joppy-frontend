import React from 'react';
import styles from './formBlock.module.css';

const FormBlock = ({ title, subtitle, children, icon }) => (
  <div className={styles.formBlock}>
    <div>{icon}</div>
    <p className={styles.title}>{title}</p>
    <p className={styles.subtitle}>{subtitle}</p>
    <div className={styles.childrenContainer}>{children}</div>
  </div>
);

export default FormBlock;
