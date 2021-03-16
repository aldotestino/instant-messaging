import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';
import Chat from './views/Chat';

function App() {

  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/chat" component={Chat} />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    </>
  );
};

export default App;
