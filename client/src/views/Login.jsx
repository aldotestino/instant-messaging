import React from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { api } from "../lib/api";

function Login({ user, setUser, pushNotification }) {

  const { register, handleSubmit, errors, reset } = useForm();

  async function onSubmit(values) {
      const usr = await api({endpoint: 'user/login', method: 'POST', values});
      reset();
      if (usr.error) {
        pushNotification('Errore', usr.error);
        return;
      }
      setUser(usr);
  }

  return (
    <div className="screen">
      {user.token && <Redirect to={{ pathname: '/messages' }} />}
      <div className="container">
        <h1 className="title">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className={errors.username ? 'input-container error' : 'input-container'}>
            <i className="fas fa-user fa-lg"></i>
            <input className="input" type="text" name="username" ref={register({ required: true })} placeholder="Username" />
          </div>

          <div className={errors.password ? 'input-container error' : 'input-container'}>
            <i className="fas fa-key fa-lg"></i>
            <input className="input" type="password" name="password" ref={register({ required: true })} placeholder="Password" />
          </div>

          <button className="button" type="submit">Login</button>
        </form>
        <p>Non hai un account? <Link className="link" to="/register">Registrati!</Link></p>
      </div>
    </div>
  );
}

export default Login;