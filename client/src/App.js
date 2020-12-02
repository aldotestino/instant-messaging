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

const base_url = 'https://server-instant-messaging.herokuapp.com';
const savedUser = JSON.parse(localStorage.getItem('user'));

function App() {

  const io = useRef(socket_io(base_url));

  const [messages, setMessages] = useState([]);

  const [user, setUser] = useState(savedUser || {
    username: '',
    token: '',
    _id: '',
    photoUrl: ''
  });

  const getMessages = useCallback(async () => {
    const msgs = await api({ endpoint: 'messages', method: 'GET', token: user.token });
    if (msgs.error) {
      alert(msgs.error);
      return;
    }
    setMessages(msgs);
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
            <Chat messages={messages} user={user} />
          </Route>
          <Route exact path="/profile">
            <Profile user={user} setUser={setUser} setMessages={setMessages} />
          </Route>
          <Route exact path="/profile/password">
            <ChangePassword user={user} />
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
