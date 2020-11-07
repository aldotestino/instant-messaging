import React from 'react';
import { useForm } from 'react-hook-form';

const base_url = 'https://server-instant-messaging.herokuapp.com';

function MessageForm({ user }) {

  const { register, handleSubmit, reset } = useForm();

  async function onSubmit(values) {
    const d = new Date()
    const isoDate = d.toISOString();
    const message = {
      content: values.message,
      date: isoDate,
      user_id: user.token
    };
    reset();
    await fetch(`${base_url}/api/v1/messages`, {
      method: 'POST',
      headers: {
        token: user.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });
  }

  return (
    <div className="message-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <input name="message" autoComplete="off" placeholder="Scrivi un messaggio" ref={register({ required: true })} />
          <button type="submit"><i className="fas fa-paper-plane fa-2x"></i></button>
        </div>
      </form>
    </div>
  );
}

export default MessageForm;