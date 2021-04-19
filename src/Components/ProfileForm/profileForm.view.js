import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './profileForm.module.css';
import Tag from '../Tag';

const ProfileForm = () => {
  const [skillData, setSkillData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    skills: [],
    roles: [],
    location: '',
  });

  const addSkill = (skillId) => {
    if (data.skills.includes(skillId)) {
      setData({ ...data, skills: [...data.skills.filter((s) => s !== skillId)] });
    } else {
      setData({ ...data, skills: [...data.skills, skillId] });
    }
  };
  const addRole = (role) => {
    setData({ ...data, roles: [...data.roles, role] });
  };

  //eslint-disable-line
  const getDataHandler = (data) => {
    setGetData([...getData, data]);
  };

  data = console.log(getData);

  const onSubmitHandler = (data) => {
    debugger; //eslint-disable-line
    console.log(data);
  };

  useEffect(() => {
    fetch('http://localhost:3001/skill')
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
    fetch('http://localhost:3001/role')
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
    fetch('http://localhost:3001/city')
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

  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <form>
      <h2>User Name</h2>
      <input {...register('firstName', { required: true, maxLength: 15 })} />
      {errors.firstName && 'First name is required'}
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
      <h2>Skills</h2>
      <div {...register('skills')}>
        {skillData
          ? skillData.map((skill) => (
              <Tag
                className={styles.tag}
                name={skill.name}
                onClick={addSkill}
                isActive={data.skills.includes(skill._id)}
                value={skill._id} //eslint-disable-line
              />
            ))
          : null}
      </div>
      <h2>Roles</h2>
      <div {...register('roles')}>
        {roleData
          ? roleData.map((role) => (
              <Tag
                className={styles.tag}
                clickable
                id={role._id} //eslint-disable-line
                role={role.role}
                getValue={getDataHandler}
              />
            ))
          : null}
      </div>
      <h2>Where do you want to work?</h2>
      <div {...register('city')}>
        {cityData
          ? cityData.map((city) => (
              <Tag
                className={styles.tag}
                clickable
                id={city._id} //eslint-disable-line
                city={city.name}
                getValue={getDataHandler}
              />
            ))
          : null}
      </div>

      <input
        type="submit"
        onClick={(event) => {
          event.preventDefault();
          onSubmitHandler({ skillData, getData });
        }}
      />
    </form>
  );
};

export default ProfileForm;
