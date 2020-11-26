import React from 'react';
import colors from '../lib/colors';

function Message({ message, user }) {
  const mine = message.user_id === user._id;
  const fDate = new Date(message.date);

  function getColor() {
    let color = localStorage.getItem(message.user_id);
    if (!color) {
      color = colors[Math.floor(Math.random() * colors.length)];
      localStorage.setItem(message.user_id, color);
    }
    return color;
  }

  return (
    <div className={mine ? 'message mine' : 'message'}>
      {!mine ? message.author.photoUrl ?
        <div className="picture"><img src={message.author.photoUrl} alt="senderPicture" /></div> :
        <div className="picture text" style={{ backgroundColor: getColor() }}><p>{message.author.username[0]}</p></div> : null}
      <div className="content">
        {mine ? null : <h3>{message.author.username}</h3>}
        <p>{message.content}</p>
        <small>{fDate.toLocaleString()}</small>
      </div>
    </div>
  );
}

export default Message;