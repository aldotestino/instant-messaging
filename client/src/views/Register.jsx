import React from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';

function Register({ user, pushNotification }) {

  const history = useHistory();

  const { register, handleSubmit, errors, reset } = useForm();

  async function onSubmit(values) {
    const usr = await api({endpoint: 'user/register', method: 'POST', values});
    reset();
    if (usr.error) {
      pushNotification('Errore', usr.error);
      return;
    }
    pushNotification('Conferma il tuo account', usr.message);
    history.push('/login');

  }

  return (
    <div className="screen">
      {user.token && <Redirect to={{ pathname: '/messages' }} />}
      <div className="container">
        <h1 className="title">Registrati</h1>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className={errors.email ? 'input-container error' : 'input-container'}>
            <i className="fas fa-envelope fa-lg"></i>
            <input className="input" type="text" name="email" ref={register({ required: true })} placeholder="Email" />
          </div>

          <div className={errors.username ? 'input-container error' : 'input-container'}>
            <i className="fas fa-user fa-lg"></i>
            <input className="input" type="text" name="username" ref={register({ required: true })} placeholder="Username" />
          </div>

          <div className={errors.password ? 'input-container error' : 'input-container'}>
            <i className="fas fa-key fa-lg"></i>
            <input className="input" type="password" name="password" ref={register({ required: true })} placeholder="Password" />
          </div>

          <div className="input-container">
            <i className="fas fa-camera fa-lg"></i>
            <input className="input" type="text" name="photoUrl" ref={register} placeholder="Foto" />
          </div>

          <button className="button" type="submit">Registrati</button>
          <p>Possiedi già un account? <Link className="link" to="/login">Effettua il login!</Link></p>

        </form>
      </div>
    </div>
  );
}

export default Register;