import React from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../lib/api';

function MessageForm({ user }) {

  const { register, handleSubmit, reset } = useForm();

  async function onSubmit(values) {
    const message = {
      content: values.message,
    };
    reset();
    const { error } = await api({endpoint: 'messages', method: 'POST', values: message, token: user.token});
    if (error) {
      console.log(error);
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