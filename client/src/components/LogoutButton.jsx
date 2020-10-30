import React from 'react';
import { useHistory } from 'react-router-dom';

function Logout({ setMessages, setUser, children }) {
  const history = useHistory();

  function logout() {
    setMessages([]);
    setUser({
      username: '',
      token: '',
      photoUrl: ''
    });
    history.push('/');
  }

  return (
    <button className="button" onClick={logout}>{children}</button>
  );
}

export default Logout;

