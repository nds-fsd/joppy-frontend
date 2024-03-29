import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from './profileForm.module.css';
import Tag from '../Tag';
import { fetchMeStuff } from '../../Utils/functions';
import { getUserToken, setUserSession } from '../../Utils/Auth';
import OneProfileForm from '../OneProfileForm';
import FormBlock from '../FormBlock';
import UserContext from '../../Contexts/userContext';
import { API_URL } from '../../Routers/routers';

const ProfileForm = () => {
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isSecondPage, setIsSecondPage] = useState(false);
  const [skillData, setSkillData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [userData, setUserData] = useState({
    skills: [],
    positions: [],
    location: '',
    salary: '40000',
  });

  const history = useHistory();

  const { setUserInfo } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const authObject = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getUserToken()}`,
    },
  };

  const addSkill = (skillId) => {
    if (userData.skills.some((e) => e.name === skillId)) {
      setUserData({
        ...userData,
        skills: [...userData.skills.filter((r) => r.name !== skillId)],
      });
    } else {
      setUserData({
        ...userData,
        skills: [...userData.skills, { name: skillId, years: '5' }],
      });
    }
  };

  const nameById = (id, array, attribute) => {
    const object = array.find((item) => item._id === id);
    return object[attribute];
  };

  const addRole = (roleId) => {
    if (!userData.positions.some((e) => e.name === roleId) && userData.positions.length === 3) {
      return;
    }

    if (userData.positions.some((e) => e.name === roleId)) {
      setUserData({
        ...userData,
        positions: [...userData.positions.filter((r) => r.name !== roleId)],
      });
    } else {
      setUserData({
        ...userData,
        positions: [...userData.positions, { name: roleId, years: '5' }],
      });
    }
  };

  const addCity = (cityId) => {
    if (userData.location === cityId) {
      setUserData({ ...userData, location: '' });
    } else {
      setUserData({ ...userData, location: cityId });
    }
  };

  const addPositionYears = (y, positionName) => {
    const updatedPositions = [...userData.positions];
    const objIndex = updatedPositions.findIndex((obj) => obj.name === positionName);
    updatedPositions[objIndex].years = y;

    setUserData({
      ...userData,
      positions: updatedPositions,
    });
  };

  const addSkillYears = (y, skillName) => {
    const updatedSkills = [...userData.skills];
    const objIndex = updatedSkills.findIndex((obj) => obj.name === skillName);
    updatedSkills[objIndex].years = y;

    setUserData({
      ...userData,
      skills: updatedSkills,
    });
  };

  useEffect(() => {
    fetchMeStuff(`${API_URL}/skill`, authObject, setSkillData);
    fetchMeStuff(`${API_URL}/position`, authObject, setRoleData);
    fetchMeStuff(`${API_URL}/city`, authObject, setCityData);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isFirstPage]);

  const onSubmit = (data) => {
    const allData = { ...userData, ...data };

    const options = {
      method: 'POST',
      headers: new Headers({ Accept: 'apllication/json', 'Content-type': 'application/json' }),
      mode: 'cors',
      body: JSON.stringify(allData),
    };

    fetch(`${API_URL}/register`, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then((res) => {
        setUserSession(res);
      })
      .then(() => {
        const auth = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getUserToken()}`,
          },
        };
        fetchMeStuff(`${API_URL}/verify`, auth, setUserInfo);
      })
      .then(() => {
        const mailOptions = {
          method: 'POST',
          headers: new Headers({
            Accept: 'apllication/json',
            'Content-type': 'application/json',
            Authorization: `Bearer ${getUserToken()}`,
          }),
          mode: 'cors',
          body: JSON.stringify({
            name: allData.name,
            email: allData.email,
          }),
        };
        fetch(`${API_URL}/send-email/register`, mailOptions).then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject();
        });
      })
      .catch()
      .then(() => history.push('/'))
      .catch((error) => console.log(error));
  };

  return (
    <>
      {isFirstPage && (
        <>
          <p className={styles.firstPageTitle}>Let us know what makes your ideal job</p>
          <OneProfileForm
            sliderValue={userData.salary}
            sliderOnChange={(s) => setUserData({ ...userData, salary: s })}
            skillData={skillData}
            addSkill={addSkill}
            otherArraySkills={userData.skills}
            roleData={roleData}
            addRole={addRole}
            otherArrayRoles={userData.positions}
            cityData={cityData}
            addCity={addCity}
            userDataCity={userData.location}
            roleYearsOnChange={addPositionYears}
            skillYearsOnChange={addSkillYears}
            buttonEnabled={
              userData.skills.length > 0 &&
              userData.positions.length > 0 &&
              userData.location !== ''
            }
            nextClicked={() => {
              if (
                userData.positions.length > 0 &&
                userData.skills.length > 0 &&
                userData.location !== ''
              ) {
                setIsFirstPage(false);
                setIsSecondPage(true);
              }
            }}
          />
        </>
      )}
      {isSecondPage && (
        <FormBlock>
          <div className={styles.secondPage}>
            <p className={styles.secondPageTitle}>
              Here's a summary of your selections {/*eslint-disable-line*/}
            </p>
            <p className={styles.listText}>
              · You want a salary of:{' '}
              <span className={styles.purpleSpan}>{`${userData.salary}€`}</span>
            </p>
            <p className={styles.listText}>
              · You want to work at:{' '}
              <span className={styles.purpleSpan}>
                {nameById(userData.location, cityData, 'name')}
              </span>
            </p>
            <p className={styles.listText}>· The positions you want:</p>
            <div className={styles.tagContainer}>
              {userData.positions.length > 0 &&
                userData.positions.map((position) => (
                  <Tag name={nameById(position.name, roleData, 'name')} isActive />
                ))}
            </div>
            <p className={styles.listText}>· The skills you have:</p>
            <div className={styles.tagContainer}>
              {userData.skills.length > 0 &&
                userData.skills.map((skill) => (
                  <Tag name={nameById(skill.name, skillData, 'skill')} isActive />
                ))}
            </div>

            <p className={styles.secondPageTitle}>
              Now that we know about your ideal job, who are you?
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.inputForm}>
              <div className={styles.inputWrapper}>
                <h2>Name</h2>
                <input type="text" {...register('name', { required: true, maxLength: 30 })} />
                {errors.name && errors.name.type === 'required' && <p>First name is required</p>}
                {errors.name && errors.name.type === 'maxLength' && (
                  <p>Name cant be longer than 15 characters</p>
                )}
              </div>
              <div className={styles.inputWrapper}>
                <h2>Email</h2>
                <input
                  {...register('email', {
                    required: true,
                    message: 'Email required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Enter a valid e-mail address',
                    },
                  })}
                />
                {errors.email && <p>{errors.email.message}</p>}
              </div>
              <div className={styles.inputWrapper}>
                <h2>Password</h2>
                <input
                  type="password"
                  {...register('password', { required: true, minLength: 3 })}
                />
                {errors.password && 'Password is required'}
              </div>
              <div className={styles.inputWrapper}>
                <h2>Short bio</h2>
                <input {...register('bio', { required: true, maxLength: 200 })} />
                {errors.bio && 'bio is required'}
              </div>
              <div className={styles.buttonsDiv}>
                <button
                  className={styles.backButton}
                  type="button"
                  onClick={() => {
                    setIsFirstPage(true);
                    setIsSecondPage(false);
                  }}
                >
                  Go Back
                </button>
                <input className={`${styles.backButton} ${styles.submitButton}`} type="submit" />
              </div>
            </form>
          </div>
        </FormBlock>
      )}
    </>
  );
};

export default ProfileForm;
