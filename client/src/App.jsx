import React, { useEffect, useState, useCallback, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import addNotification, { Notifications } from 'react-push-notification';
import socket_io from 'socket.io-client';

import Home from './views/Home';
import Messages from './views/Messages';
import Login from "./views/Login";
import Register from './views/Register';
import Profile from './views/Profile';

const base_url = 'https://server-instant-messaging.herokuapp.com';

function App() {

  let io = useRef(socket_io(base_url));

  const [messages, setMessages] = useState([]);

  const [user, setUser] = useState({
    username: '',
    token: '',
    _id: '',
    photoUrl: ''
  });

  const getMessages = useCallback(async () => {
    try {
      const response = await fetch(`${base_url}/api/v1/messages`, {
        headers: {
          token: user.token
        }
      });
      const msgs = await response.json();
      if (msgs.error) {
        alert(msgs.error);
        return;
      }
      setMessages(msgs);
    } catch (e) {
      console.log(e.message);
    }
  }, [user]);

  useEffect(() => {
    if (user.token) {
      getMessages().then(() => {
        io.current = socket_io(base_url);
        io.current.on('message', data => {
          setMessages(prevMessages => [...prevMessages, data]);
        });
      });
    } else {
      io.current.disconnect();
    }

    return () => io.current.disconnect();

  }, [user, getMessages]);

  function pushNotification(title, message) {
    addNotification({
      title,
      message,
      backgroundTop: '#2F89FC',
      duration: 5000,
      closeButton: <i className="fas fa-times"></i>
    });
  }

  return (
    <Router>
      <div>
        <Notifications />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login user={user} setUser={setUser} pushNotification={pushNotification} />
          </Route>
          <Route exact path="/register">
            <Register user={user} pushNotification={pushNotification} />
          </Route>
          <Route exact path="/messages">
            <Messages messages={messages} user={user} setUser={setUser} setMessages={setMessages} />
          </Route>
          <Route exact path="/profile">
            <Profile user={user} setUser={setUser} pushNotification={pushNotification} />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </Router >
  );
}

export default App;
