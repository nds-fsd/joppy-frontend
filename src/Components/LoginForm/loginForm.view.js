import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styles from './loginForm.module.css';

import { REGISTER_PAGE } from '../../Routers/routers';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    const url = 'http://localhost:3001/login';
    const body = {
      data,
    };

    const options = {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-type': 'application/json',
      }),
      mode: 'cors',
      body: JSON.stringify(body),
    };

    fetch(url, options)
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const enterSession = () => {
  //   <Link to={OFFER_PAGE} />;
  // };

  return (
    <div className={styles.loginForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputBox}>
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
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className={styles.inputBox}>
          <h2>Password</h2>
          <input {...register('password', { required: true, minLength: 8 })} />
          {errors.password && 'Password is required'}
        </div>
      </form>
      <p>Forgotten password</p>
      <button type="submit" className={styles.submit}>
        Sign in
      </button>
      <p>No account? Create one </p> <Link to={REGISTER_PAGE}>here</Link>
    </div>
  );
};

export default LoginForm;
