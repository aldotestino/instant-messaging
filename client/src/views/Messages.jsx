import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import Message from '../components/Message';
import NavBar from '../components/NavBar';
import MessageForm from '../components/MessageForm';

function Messages({ messages, user, setMessages, setUser }) {


  useEffect(() => {
    document.documentElement.scrollTop = document.documentElement.scrollHeight
  }, [messages]);

  return (
    <div>
      {!user.token && <Redirect to={{ pathname: '/login' }} />}
      <NavBar setMessages={setMessages} setUser={setUser} user={user} />
      <div className="chat">
        {messages.map(msg => <Message key={msg._id} message={msg} user={user} />)}
      </div>
      <MessageForm user={user} />
    </div>
  )
}

export default Messages;