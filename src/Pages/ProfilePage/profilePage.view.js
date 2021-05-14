import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './profilePage.module.css';
import { PROFILE_PAGE } from '../../Routers/routers'; //eslint-disable-line
import Profile from '../../Components/Profile';
import ProfileIntro from '../../Components/ProfileIntro';
import ProfileEdit from '../../Components/ProfileEdit';
// import AdminProfileModal from '../../Components/AdminProfileModal';
import { ReactComponent as Plant } from '../../Images/plant.svg';
import { getUserToken, getSessionUser } from '../../Utils/Auth';
import { fetchMeStuff } from '../../Utils/functions';

const ProfilePage = () => {
  const [userData, setUserData] = useState();
  const [locations, setLocations] = useState([]);
  // const [openModal, setOpenModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  // const handleEditModal = () => setOpenModal(!openModal);
  const handleEdit = () => setOpenEdit(!openEdit);
  const userToken = getUserToken();
  const authObject = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
  };

  useEffect(() => {
    fetchMeStuff(`http://localhost:3001/user/${getSessionUser().id}`, authObject, setUserData);
    fetchMeStuff('http://localhost:3001/city', authObject, setLocations);
  }, [openEdit]);

  return (
    <div className={styles.profilePage}>
      {/* {openModal ? (
        <AdminProfileModal
          open={openModal}
          close={() => setOpenModal(false)}
          userData={userData}
          locations={locations}
        />
      ) : null} */}
      <ProfileIntro userData={userData} locations={locations} />
      <div className={styles.profileNavBar}>
        <Link to={PROFILE_PAGE} className={styles.link}>
          Profile
        </Link>
        <FontAwesomeIcon icon="edit" className={styles.icon} onClick={handleEdit} />

        <Link to={`${PROFILE_PAGE}/myoffers`} className={styles.link}>
          My Offers
        </Link>
      </div>
      <Router>
        <Switch>
          <Route path={PROFILE_PAGE}>
            {openEdit ? <ProfileEdit userData={userData} /> : <Profile userData={userData} />}
          </Route>
          <Route path={`${PROFILE_PAGE}/myoffers`}>
            <p>AQUI VAN OFFERS</p>
          </Route>
        </Switch>
      </Router>

      <Plant className={styles.plant} />
    </div>
  );
};

export default ProfilePage;
