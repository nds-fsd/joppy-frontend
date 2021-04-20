import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './profileForm.module.css';
import Tag from '../Tag';

const ProfileForm = () => {
  const [isFirstPage, setIsFirstPage] = useState(true); //eslint-disable-line
  const [isSecondPage, setIsSecondPage] = useState(false); //eslint-disable-line
  const [skillData, setSkillData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    skills: [],
    roles: [],
    city: [],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

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

  const addRole = (roleId) => {
    if (userData.roles.includes(roleId)) {
      setUserData({ ...userData, roles: [...userData.roles.filter((r) => r !== roleId)] });
    } else {
      setUserData({ ...userData, roles: [...userData.roles, roleId] });
    }
  };

  const addCity = (cityId) => {
    if (userData.city.includes(cityId)) {
      setUserData({ ...userData, city: [...userData.city.filter((c) => c !== cityId)] });
    } else {
      setUserData({ ...userData, city: [...userData.city, cityId] });
    }
  };

  useEffect(() => {
    fetch('http://localhost:3001/skill', authObject)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then((data) => {
        setSkillData(data);
      })
      .catch();
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/role', authObject)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then((data) => {
        setRoleData(data);
      })
      .catch();
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/city', authObject)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then((data) => {
        setCityData(data);
      })
      .catch();
  }, []);

  return (
    <div className={styles.formContainer}>
      {isFirstPage && (
        <div className={styles.firstPage}>
          <h2>Skills</h2>
          <div>
            {skillData
              ? skillData.map((skill) => (
                  <Tag
                    className={styles.tag}
                    name={skill.skill}
                    onClick={addSkill}
                    isActive={userData.skills.includes(skill._id)}
                    value={skill._id}
                  />
                ))
              : null}
          </div>
          <h2>Roles</h2>
          <div>
            {roleData
              ? roleData.map((role) => (
                  <Tag
                    className={styles.tag}
                    name={role.role}
                    onClick={addRole}
                    isActive={userData.roles.includes(role._id)}
                    value={role._id}
                  />
                ))
              : null}
          </div>
          <h2>Where do you want to work?</h2>
          <div>
            {cityData
              ? cityData.map((city) => (
                  <Tag
                    className={styles.tag}
                    name={city.name}
                    onClick={addCity}
                    isActive={userData.city.includes(city._id)}
                    value={city._id}
                  />
                ))
              : null}
          </div>
          <button
            type="button"
            onClick={() => {
              setIsFirstPage(false);
              setIsSecondPage(true);
            }}
          >
            Next page
          </button>
        </div>
      )}
      {isSecondPage && (
        <div className={styles.secondPage}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>User Name</h2>
            <input type="text" {...register('name', { required: true, maxLength: 15 })} />
            {errors.name && <p>First name is required</p>}
            <h2>Email</h2>
            <input
              {...register('email', {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Enter a valid e-mail address',
                },
              })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
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
