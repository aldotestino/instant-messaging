import React from 'react';

function Message({ message, user }) {
  const mine = message.username === user.username ? true : false;
  const fDate = new Date(message.date);

  return (
    <div className={mine ? 'message mine' : 'message'}>
      {!mine ? message.photoUrl ?
        <img src={message.photoUrl} alt="senderPicture" className="message-picture" /> :
        <div className="no-message-picture">{message.username[0]}</div> : null}
      <div className="content">
        {message.username === user.username ? null : <h3>{message.username}</h3>}
        <p>{message.content}</p>
        <small>{`${fDate.toLocaleDateString()} - ${fDate.toLocaleTimeString()}`}</small>
      </div>
    </div>
  );
}

export default Message;