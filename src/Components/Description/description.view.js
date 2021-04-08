import React from 'react';
import styles from "./description.module.css";

const Description = () => {
    return (
        <div className={styles.jobdescription} >
            <h2>Job Description</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada.
            </p>
            <hr></hr>
            <img src="./logo512.png" alt="company logo" width="80" height="80" />
            <h2>All about Facebook</h2>
            <p>Big sized company</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Pulvinar pellentesque habitant morbi tristique senectus et netus et malesuada.
            </p>
            <video width="320" height="240" controls>
                <source src="facebook.mp4" type="video/mp4"/>
            </video>
            



            
        </div>
    )
}

export default Description;
