import React from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login({ user, setUser }) {

  const { register, handleSubmit, errors, reset } = useForm();

  async function onSubmit(values) {
    try {
      const response = await fetch('https://server-instant-messaging.herokuapp.com/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      reset();
      const usr = await response.json();
      if (usr.error) {
        console.log(usr.error);
        alert(usr.error);
        return;
      }
      setUser(usr);
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className="login">
      {user.token && <Redirect to={{ pathname: '/messages' }} />}
      <div className="form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className={errors.username ? 'input-container error' : 'input-container'}>
            <i className="fas fa-user fa-lg"></i>
            <input type="text" name="username" ref={register({ required: true })} placeholder="Username" />
          </div>

          <div className={errors.password ? 'input-container error' : 'input-container'}>
            <i className="fas fa-key fa-lg"></i>
            <input type="password" name="password" ref={register({ required: true })} placeholder="Password" />
          </div>

          <button className="button" type="submit">Login</button>
        </form>
        <p>Non hai un account? <Link className="link" to="/register">Registrati!</Link></p>
      </div>
    </div>
  );
}

export default Login;