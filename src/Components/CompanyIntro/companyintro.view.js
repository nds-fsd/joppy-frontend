import React from 'react';
import styles from "./companyintro.module.css";

const CompanyIntro = () => {
    return (
        <div className={styles.container}>
            <div>
                <img src="./logo512.png" alt="company logo" width="80" height="80" />
            </div>
            <div className={styles.title}>
                <h4 className={styles.companyname}>Facebook Inc.</h4>
                <p className={styles.size} >Small sized company</p>
                <p className={styles.profile}>Full Company profile</p>
            </div>  
        </div>
    )
}

export default CompanyIntro;
