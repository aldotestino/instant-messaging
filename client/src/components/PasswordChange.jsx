import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom'

const base_url = 'https://server-instant-messaging.herokuapp.com';

function PasswordChange({ user, onClose, pushNotification }) {

  const history = useHistory();

  const { register, handleSubmit, errors, reset } = useForm();

  async function onSubmit(values) {
    try {
      const response = await fetch(`${base_url}/api/v1/user/update/password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'token': user.token
        },
        body: JSON.stringify(values)
      });
      const passwordChange = await response.json();
      if (passwordChange.error) {
        pushNotification('Errore', passwordChange.error);
        reset();
        return;
      }
      pushNotification('Cambio password', passwordChange.message);
      history.push('/messages');
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className="form" >
      <h1>Cambia password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className={errors.password ? 'input-container error' : 'input-container'}>
          <i className="fas fa-key fa-lg"></i>
          <input type="password" name="password" ref={register({ required: true })} placeholder="Password" />
        </div>

        <div className={errors.newPassword ? 'input-container error' : 'input-container'}>
          <i className="fas fa-key fa-lg"></i>
          <input type="password" name="newPassword" ref={register({ required: true })} placeholder="Nuova password" />
        </div>

        <button className="button" type="submit">Aggiorna</button>
        <button className="button" id="back" type="button" onClick={onClose}>Indietro</button>
      </form>
    </div>
  );
}

export default PasswordChange;