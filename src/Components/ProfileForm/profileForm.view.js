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
    roles: [],
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
    if (userData.skills.includes(skillId)) {
      setUserData({ ...userData, skills: [...userData.skills.filter((s) => s !== skillId)] });
    } else {
      setUserData({ ...userData, skills: [...userData.skills, skillId] });
    }
  };

  const nameById = (id, array, attribute) => {
    const skillObject = array.find((item) => item._id === id);
    return skillObject[attribute];
  };

  const addRole = (roleId) => {
    if (!userData.roles.includes(roleId) && userData.roles.length === 3) {
      return;
    }

    if (userData.roles.includes(roleId)) {
      setUserData({ ...userData, roles: [...userData.roles.filter((r) => r !== roleId)] });
    } else {
      setUserData({ ...userData, roles: [...userData.roles, roleId] });
    }
  };

  const addCity = (cityId) => {
    if (userData.city === cityId) {
      setUserData({ ...userData, city: '' });
    } else {
      setUserData({ ...userData, city: cityId });
    }
  };

  useEffect(() => {
    fetchMeStuff('http://localhost:3001/skill', authObject, setSkillData);
    fetchMeStuff('http://localhost:3001/position', authObject, setRoleData);
    fetchMeStuff('http://localhost:3001/city', authObject, setCityData);
  }, []);

  const onSubmit = (data) => {
    const allData = { ...userData, ...data };
    console.log(allData);
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
          otherArrayRoles={userData.roles}
          cityData={cityData}
          addCity={addCity}
          userDataCity={userData.city}
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
          <h1>The roles you want</h1>
          {userData.roles.length > 0 &&
            userData.roles.map((roleId) => <Tag name={nameById(roleId, roleData, 'name')} />)}
          <h1>The skills you have</h1>
          {userData.skills.length > 0 &&
            userData.skills.map((skillId) => <Tag name={nameById(skillId, skillData, 'skill')} />)}
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
