import React from 'react';
import { useForm } from 'react-hook-form';

const base_url = 'https://server-instant-messaging.herokuapp.com';

function MessageForm({ user }) {

  const { register, handleSubmit, reset } = useForm();

  async function onSubmit(values) {
    const message = {
      content: values.message,
    };
    reset();
    try {
      const response = await fetch(`${base_url}/api/v1/messages`, {
        method: 'POST',
        headers: {
          token: user.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
      });
      const { error } = await response.json();
      if (error) {
        console.log(error);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <form className="input-container" onSubmit={handleSubmit(onSubmit)}>
      <input className="input" name="message" autoComplete="off" placeholder="Scrivi un messaggio" ref={register({ required: true })} />
      <button className="button" type="submit"><i className="fas fa-arrow-up fa-2x"></i></button>
    </form>
  );
}

export default MessageForm;