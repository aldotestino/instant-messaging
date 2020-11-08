import React from 'react';
import LogoutButton from './LogoutButton';
import { Link } from 'react-router-dom';

function NavBar({ setMessages, setUser, user }) {

  return (
    <nav className="nav-bar">
      <h1 className="title">Chat</h1>
      <div className="right">
        <LogoutButton setUser={setUser} setMessages={setMessages}>Logout</LogoutButton>
        {user.photoUrl ?
          <Link to="/profile" className="profile-picture"><img src={user.photoUrl} alt="profilePicture"></img></Link> :
          <Link to="/profile" className="no-profile-picture">{user.username[0]}</Link>}
      </div>
    </nav>
  );
}

export default NavBar;