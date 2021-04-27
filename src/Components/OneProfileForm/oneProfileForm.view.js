import React from 'react';
import styles from './oneProfileForm.module.css';
import SalarySlider from '../SalarySlider';
import TagBlock from '../TagBlock';
import FormBlock from '../FormBlock';
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
    <FormBlock
      title="What are your salary expectations?"
      subtitle="Companies will never see this, we promise"
    >
      <SalarySlider value={sliderValue} onChange={sliderOnChange} />
    </FormBlock>

    <FormBlock title="Where do you want to work?" subtitle="Choose one option">
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
    </FormBlock>

    <FormBlock title="Which roles describe you best?" subtitle="You can choose up to 3">
      <TagBlock
        array={roleData}
        tagClicked={addRole}
        attributeName="name"
        otherArray={otherArrayRoles}
        yearsOnChange={roleYearsOnChange}
      />
    </FormBlock>

    <FormBlock title="What are your top skills?" subtitle="Choose from the list">
      <TagBlock
        array={skillData}
        tagClicked={addSkill}
        attributeName="skill"
        otherArray={otherArraySkills}
        yearsOnChange={skillYearsOnChange}
      />
    </FormBlock>

    <button className={styles.nextButton} type="button" onClick={nextClicked}>
      Next step
    </button>
  </div>
);

export default OneProfileForm;
