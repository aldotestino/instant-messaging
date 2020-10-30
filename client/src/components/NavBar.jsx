import React from 'react';
import LogoutButton from './LogoutButton';

function NavBar({ setMessages, setUser, user }) {

  return (
    <nav className="nav-bar">
      <h1 className="title">Chat</h1>
      <div className="right">
        <LogoutButton setUser={setUser} setMessages={setMessages}>Logout</LogoutButton>
        {user.photoUrl ?
          <img className="profile-picture" src={user.photoUrl} alt="profilePicture"></img> :
          <div className="no-profile-picture">{user.username[0]}</div>}
      </div>
    </nav>
  );
}

export default NavBar;