import React from 'react';
import styles from "./jobposition.module.css";
import Tag from "../Tag"

const JobPosition = ({ icon, children, match }) => {
    return (
        <div className={styles.jobtag}>
           <h2>Software Engineer</h2>
           <Tag icon={icon} children={children} match={match}/>
           <p>Searching for</p>
           <Tag icon={icon} children={children} match={match}/>
           <p>Knowing</p>
           <Tag icon={icon} children={children} match={match}/>
        </div>
    )
}

export default JobPosition;
