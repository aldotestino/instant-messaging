import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

function Home() {
  return (
    <div className="home">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <h1 className="title">Instant Messaging</h1>
        <Link id="register" className="button" to="/register">Registrati</Link>
        <Link id="login" className="button" to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Home;