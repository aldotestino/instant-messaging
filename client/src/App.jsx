import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import socket_io from 'socket.io-client';

import Home from './views/Home';
import Messages from './views/Messages';
import Login from "./views/Login";
import Register from './views/Register';

const base_url = 'https://server-instant-messaging.herokuapp.com';

function App() {

  const [messages, setMessages] = useState([]);

  const [user, setUser] = useState({
    username: '',
    token: '',
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

  async function connectToSocket() {
    const io = socket_io(base_url);
    io.on('message', data => {
      setMessages(prevMessages => [...prevMessages, data]);
    });
  }

  useEffect(() => {
    async function init() {
      await getMessages();
      await connectToSocket();
    }
    if (user.token) {
      init();
    }
  }, [user, getMessages]);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login user={user} setUser={setUser} />
          </Route>
          <Route exact path="/register">
            <Register user={user} />
          </Route>
          <Route exact path="/messages">
            <Messages messages={messages} user={user} setUser={setUser} setMessages={setMessages} />
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
