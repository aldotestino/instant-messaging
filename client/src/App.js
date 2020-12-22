import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import socket_io from 'socket.io-client';
import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import Chat from './views/Chat';
import Profile from './views/Profile';
import ChangePassword from './views/ChangePassword';
import { api } from './lib/api';
import { SERVER_URL } from './lib/config';

const savedUser = JSON.parse(localStorage.getItem('user'));

function App() {

  const io = useRef(socket_io(SERVER_URL));

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(savedUser || {
    username: '',
    token: '',
    _id: '',
    photoUrl: ''
  });

  const getMessages = useCallback(async () => {
    setLoading(true);
    const msgs = await api({ endpoint: 'messages', method: 'GET', token: user.token });
    console.log(msgs);
    if (msgs.error) {
      alert(msgs.error);
      return;
    }
    setMessages(msgs);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (user.token) {
      getMessages().then(() => {
        io.current = socket_io(SERVER_URL);
        io.current.on('message', data => {
          setMessages(prevMessages => [...prevMessages, data]);
        });
      });
    } else {
      io.current.disconnect();
    }

    return () => io.current.disconnect();

  }, [user, getMessages]);

  function logout() {
    setUser({
      username: '',
      token: '',
      _id: '',
      photoUrl: ''
    });
    setMessages([]);
    localStorage.setItem('remember', null);
    localStorage.setItem('user', null);
  }

  return (
    <ChakraProvider theme={theme}>
      <Router>
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
          <Route exact path="/chat">
            <Chat messages={messages} loading={loading} user={user} logout={logout} />
          </Route>
          <Route exact path="/profile">
            <Profile user={user} setUser={setUser} setMessages={setMessages} logout={logout} />
          </Route>
          <Route exact path="/profile/password">
            <ChangePassword user={user} logout={logout} />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router >
    </ChakraProvider >
  );
}


export default App;
