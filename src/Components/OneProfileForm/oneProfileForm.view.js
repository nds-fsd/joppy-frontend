import React from 'react';
import styles from './oneProfileForm.module.css';
import SalarySlider from '../SalarySlider';
import TagBlock from '../TagBlock';
import Tag from '../Tag';

const OneProfileForm = ({
  sliderValue,
  sliderOnChange,
  skillData,
  addSkill,
  otherArraySkills,
  roleData,
  addRole,
  otherArrayRoles,
  cityData,
  addCity,
  userDataCity,
  nextClicked,
  roleYearsOnChange,
  skillYearsOnChange,
}) => (
  <div className={styles.firstPage}>
    <SalarySlider value={sliderValue} onChange={sliderOnChange} />

    <TagBlock
      title="Skills"
      subtitle="something about skills"
      array={skillData}
      tagClicked={addSkill}
      attributeName="skill"
      otherArray={otherArraySkills}
      yearsOnChange={skillYearsOnChange}
    />

    <TagBlock
      title="Roles"
      subtitle="something about roles"
      array={roleData}
      tagClicked={addRole}
      attributeName="name"
      otherArray={otherArrayRoles}
      yearsOnChange={roleYearsOnChange}
    />

    <h2>Where do you want to work?</h2>
    <div>
      {cityData
        ? cityData.map((city) => (
            <Tag
              name={city.name}
              onClick={addCity}
              isActive={userDataCity === city._id}
              value={city._id}
            />
          ))
        : null}
    </div>
    <button type="button" onClick={nextClicked}>
      Next page
    </button>
  </div>
);

export default OneProfileForm;
