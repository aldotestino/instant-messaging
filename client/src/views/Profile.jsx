import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, Redirect } from 'react-router-dom'

import PasswordChange from '../components/PasswordChange';

const base_url = 'https://server-instant-messaging.herokuapp.com';

function Profile({ user, setUser, pushNotification }) {

  const [modal, setModal] = useState(false);

  function toggleModal() {
    setModal(prev => !prev);
  }

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      newUsername: user.username,
      newPhotoUrl: user.photoUrl
    }
  });

  const history = useHistory();

  async function onSubmit(values) {
    try {
      const response = await fetch(`${base_url}/api/v1/user/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'token': user.token
        },
        body: JSON.stringify(values)
      });
      const updatedUser = await response.json();
      if (updatedUser.error) {
        pushNotification('Errore', updatedUser.error);
        return;
      }
      setUser(updatedUser);
      history.push('/messages');
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className="profile">
      {!user.token && <Redirect to={{ pathname: '/login' }} />}

      {user.photoUrl ?
        <img className="profile-picture" src={user.photoUrl} alt="profilePicture"></img> :
        null}

      {modal ? <PasswordChange user={user} onClose={toggleModal} pushNotification={pushNotification} /> :
        <div className="form">
          <h1>Profilo</h1>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className={errors.newUsername ? 'input-container error' : 'input-container'}>
              <i className="fas fa-user fa-lg"></i>
              <input type="text" name="newUsername" ref={register({ required: true })} placeholder="Username" />
            </div>

            <div className="input-container">
              <i className="fas fa-camera fa-lg"></i>
              <input type="text" name="newPhotoUrl" ref={register} placeholder="Foto" />
            </div>

            <button className="button" type="submit">Aggiorna</button>
            <button className="button" type="button" onClick={toggleModal}>Cambia Password</button>
            <Link className="button" to="/login">Indietro</Link>

          </form>
        </div>
      }

    </div>
  );
}

export default Profile;