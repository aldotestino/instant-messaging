import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ setUser, user }) {

  return (
    <nav className="nav-bar">
      <h1 className="title">Chat</h1>
      {user.photoUrl ?
        <Link to="/profile" className="picture"><img src={user.photoUrl} alt="profilePicture"></img></Link> :
        <Link to="/profile" className="picture text"><p>{user.username[0]}</p></Link>}
    </nav >
  );
}

export default NavBar;