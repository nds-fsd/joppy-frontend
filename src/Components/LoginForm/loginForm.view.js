import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import styles from './loginForm.module.css';
import { REGISTER_PAGE, OFFER_PAGE, ADMIN_PAGE, API_URL } from '../../Routers/routers';
import { getSessionUserRole, getUserToken, setUserSession } from '../../Utils/Auth';
import Plant from '../../Images/plant.svg';
import { ReactComponent as AppLogo } from '../../Images/Logo_first_draft.svg';
import { fetchMeStuff } from '../../Utils/functions';
import UserContext from '../../Contexts/userContext';

const LoginForm = () => {
  const history = useHistory();
  const { setUserInfo } = useContext(UserContext);
  const loginOK = (role) => {
    if (role === 'DEVELOPER_ROLE') {
      history.push(`${OFFER_PAGE}`);
    } else {
      history.push(`${ADMIN_PAGE}`);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState();

  const onSubmit = (data) => {
    const url = `${API_URL}/login`;
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
        if (response.ok) {
          return response.json();
        }
        {
          const err = response.json();
          return Promise.resolve(err);
        }
      })
      .then((response) => {
        setErrorMessage(JSON.stringify(response));
        setUserSession(response);
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
        loginOK(getSessionUserRole());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.loginForm}>
      <AppLogo className={styles.logo} />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
          {errorMessage && errorMessage.includes('email is not registered') ? (
            <p className={styles.invalid}>This email is not registered</p>
          ) : null}
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className={styles.inputBox}>
          <h2>Password</h2>
          <input
            {...register('password', { required: true, minLength: 3 })}
            type="password"
            className={styles.input}
          />
          {errorMessage && errorMessage.includes('password') ? (
            <p className={styles.invalid}>Wrong password</p>
          ) : null}
        </div>
        <input type="submit" className={styles.submit} />
        <div className={styles.noAccount}>
          <p>
            No account? Create one
            <Link to={REGISTER_PAGE} className={styles.link}>
              here
            </Link>
          </p>
        </div>
      </form>
      <img src={Plant} alt="plant" className={styles.plant} />
    </div>
  );
};

export default LoginForm;
