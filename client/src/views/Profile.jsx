import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, Redirect } from 'react-router-dom'
import LogoutButton from '../components/LogoutButton';
import PasswordChange from '../components/PasswordChange';
import { api } from "../lib/api";

function Profile({ user, setUser, pushNotification, setMessages }) {

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
    const updatedUser = await api({endpoint: 'user/update', method: 'PATCH', values, token: user.token});
    if (updatedUser.error) {
      pushNotification('Errore', updatedUser.error);
      return;
    }
    setUser(updatedUser);
    history.push('/messages');
  }

  return (
    <div className="screen">
      {!user.token && <Redirect to={{ pathname: '/login' }} />}

      {modal ? <PasswordChange user={user} onClose={toggleModal} pushNotification={pushNotification} /> :

        <div className="container">
          {user.photoUrl ?
            <div className="image-container">
              <img className="image" src={user.photoUrl} alt="profilePicture"></img>
            </div> :
            null}

          <h1 className="title">Profilo</h1>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className={errors.newUsername ? 'input-container error' : 'input-container'}>
              <i className="fas fa-user fa-lg"></i>
              <input className="input" type="text" name="newUsername" ref={register({ required: true })} placeholder="Username" />
            </div>

            <div className="input-container">
              <i className="fas fa-camera fa-lg"></i>
              <input className="input" type="text" name="newPhotoUrl" ref={register} placeholder="Foto" />
            </div>

            <button className="button" type="submit">Aggiorna</button>
            <button className="button" type="button" onClick={toggleModal}>Cambia Password</button>
            <Link className="button" to="/login">Indietro</Link>
            <LogoutButton setUser={setUser} setMessages={setMessages}>Logout</LogoutButton>

          </form>
        </div>
      }

    </div>
  );
}

export default Profile;