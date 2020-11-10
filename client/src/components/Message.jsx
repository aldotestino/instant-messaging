import React from 'react';

function Message({ message, user }) {
  const mine = message.user_id === user._id;
  const fDate = new Date(message.date);

  return (
    <div className={mine ? 'message mine' : 'message'}>
      {!mine ? message.author.photoUrl ?
        <img src={message.author.photoUrl} alt="senderPicture" className="message-picture" /> :
        <div className="no-message-picture">{message.author.username[0]}</div> : null}
      <div className="content">
        {mine ? null : <h3>{message.author.username}</h3>}
        <p>{message.content}</p>
        <small>{fDate.toLocaleString()}</small>
      </div>
    </div>
  );
}

export default Message;