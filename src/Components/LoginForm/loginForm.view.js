import React, { useState } from 'react';
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

  const [errorMessage, setErrorMessage] = useState();

  const onSubmit = (data) => {
    console.log(data);

    const url = 'http://localhost:3001/login';

    const options = {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-type': 'application/json',
      }),
      mode: 'cors',
      body: JSON.stringify(data),
    };

    fetch(url, options)
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
        {
          const err = response.json();
          return Promise.resolve(err);
        }
      })
      .then((response) => {
        console.log(response);

        setErrorMessage(JSON.stringify(response));
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            className={styles.input}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className={styles.inputBox}>
          <h2>Password</h2>
          <input
            {...register('password', { required: true, minLength: 1 })}
            type="password"
            className={styles.input}
          />
        </div>
        <input type="submit" className={styles.submit} />

        {errorMessage && errorMessage.includes('email is not registered') ? (
          <p className={styles.invalid}>This email is not registered</p>
        ) : null}
        {errorMessage && errorMessage.includes('password') ? (
          <p className={styles.invalid}>Wrong password</p>
        ) : null}
      </form>
      <div className={styles.noAccount}>
        <p>No account? Create one </p>
        <Link to={REGISTER_PAGE} className={styles.link}>
          here
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
