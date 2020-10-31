import React from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const base_url = process.env.SERVERURI || 'http://localhost:3001';

function Register({ user }) {

  const history = useHistory();

  const { register, handleSubmit, errors, reset } = useForm();


  async function onSubmit(values) {
    try {
      const response = await fetch(`${base_url}/api/v1/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      reset();
      const usr = await response.json();
      if (usr.error) {
        alert(usr.error);
        return;
      }
      alert(usr.message);
      history.push('/login');
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className="register">
      {user.token && <Redirect to={{ pathname: '/messages' }} />}
      <div className="form">
        <h1>Registrati</h1>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className={errors.email ? 'input-container error' : 'input-container'}>
            <i className="fas fa-envelope fa-lg"></i>
            <input type="text" name="email" ref={register({ required: true })} placeholder="Email" />
          </div>

          <div className={errors.username ? 'input-container error' : 'input-container'}>
            <i className="fas fa-user fa-lg"></i>
            <input type="text" name="username" ref={register({ required: true })} placeholder="Username" />
          </div>

          <div className={errors.password ? 'input-container error' : 'input-container'}>
            <i className="fas fa-key fa-lg"></i>
            <input type="password" name="password" ref={register({ required: true })} placeholder="Password" />
          </div>

          <div className="input-container">
            <i className="fas fa-camera fa-lg"></i>
            <input type="text" name="photoUrl" ref={register} placeholder="Foto" />
          </div>

          <button className="button" type="submit">Registrati</button>
          <p>Possiedi già un account? <Link className="link" to="/login">Effettua il login!</Link></p>

        </form>
      </div>
    </div>
  );
}

export default Register;