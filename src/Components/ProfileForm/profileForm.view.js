import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './profileForm.module.css';
import Tag from '../Tag';
import fetchMeStuff from '../../Utils/functions';
import OneProfileForm from '../OneProfileForm';

const ProfileForm = () => {
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isSecondPage, setIsSecondPage] = useState(false);
  const [skillData, setSkillData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [userData, setUserData] = useState({
    skills: [],
    positions: [],
    city: '',
    salary: '40000',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const authObject = {
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTg4NTA1MjZ9.zWaG0bpB2EyKhBJA-f4Njki1Kxugvxo1uIx6kDO5ie8',
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
    if (userData.city === cityId) {
      setUserData({ ...userData, city: '' });
    } else {
      setUserData({ ...userData, city: cityId });
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
    fetchMeStuff('http://localhost:3001/skill', authObject, setSkillData);
    fetchMeStuff('http://localhost:3001/position', authObject, setRoleData);
    fetchMeStuff('http://localhost:3001/city', authObject, setCityData);
  }, []);

  const onSubmit = (data) => {
    const allData = { ...userData, ...data };
    console.log(allData);

    const options = {
      method: 'POST',
      headers: new Headers({ Accept: 'apllication/json', 'Content-type': 'application/json' }),
      mode: 'cors',
      body: JSON.stringify(allData),
    };

    fetch('http://localhost:3001/register', options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then((res) => {
        console.log(res);
      })
      .catch();
  };

  return (
    <div className={styles.formContainer}>
      {isFirstPage && (
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
          userDataCity={userData.city}
          roleYearsOnChange={addPositionYears}
          skillYearsOnChange={addSkillYears}
          nextClicked={() => {
            setIsFirstPage(false);
            setIsSecondPage(true);
          }}
        />
      )}
      {isSecondPage && (
        <div className={styles.secondPage}>
          <h1>
            You want a salary of: <span>{userData.salary}</span>
          </h1>
          <h1>
            You want to work at: <span>{nameById(userData.city, cityData, 'name')}</span>
          </h1>
          <h1>The positions you want</h1>
          {userData.positions.length > 0 &&
            userData.positions.map((position) => (
              <Tag name={nameById(position.name, roleData, 'name')} />
            ))}
          <h1>The skills you have</h1>
          {userData.skills.length > 0 &&
            userData.skills.map((skill) => <Tag name={nameById(skill.name, skillData, 'skill')} />)}
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Name</h2>
            <input type="text" {...register('name', { required: true, maxLength: 15 })} />
            {errors.name && errors.name.type === 'required' && <p>First name is required</p>}
            {errors.name && errors.name.type === 'maxLength' && (
              <p>Name cant be longer than 15 characters</p>
            )}
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
            <h2>Password</h2>
            <input type="password" {...register('password', { required: true, minLength: 8 })} />
            {errors.password && 'Password is required'}
            <h2>Short bio</h2>
            <input {...register('bio', { required: true, maxLength: 200 })} />
            {errors.bio && 'bio is required'}
            <button
              type="button"
              onClick={() => {
                setIsFirstPage(true);
                setIsSecondPage(false);
              }}
            >
              Go Back
            </button>
            <input type="submit" />
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
