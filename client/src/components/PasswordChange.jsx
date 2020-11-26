import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom'
import { api } from "../lib/api";

function PasswordChange({ user, onClose, pushNotification }) {

  const history = useHistory();

  const { register, handleSubmit, errors, reset } = useForm();

  async function onSubmit(values) {
    const passwordChange = await api({endpoint: 'user/update/password', method: 'PATCH', values, token: user.token});
    if (passwordChange.error) {
      pushNotification('Errore', passwordChange.error);
      reset();
      return;
    }
    pushNotification('Cambio password', passwordChange.message);
    history.push('/messages');
  }

  return (
    <div className="container" >
      <h1 className="title">Password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className={errors.password ? 'input-container error' : 'input-container'}>
          <i className="fas fa-key fa-lg"></i>
          <input className="input" type="password" name="password" ref={register({ required: true })} placeholder="Password" />
        </div>

        <div className={errors.newPassword ? 'input-container error' : 'input-container'}>
          <i className="fas fa-key fa-lg"></i>
          <input className="input" type="password" name="newPassword" ref={register({ required: true })} placeholder="Nuova password" />
        </div>

        <button className="button" type="submit">Aggiorna</button>
        <button className="button" type="button" onClick={onClose}>Indietro</button>
      </form>
    </div>
  );
}

export default PasswordChange;