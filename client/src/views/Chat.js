import React, { useEffect, useRef } from 'react';
import { Box, Stack, Text, Progress } from '@chakra-ui/react';
import { Redirect } from 'react-router-dom';
import ChatNavbar from '../components/ChatNavbar';
import MessageInput from '../components/MessageInput';
import Message from '../components/Message';
import { ACCENT_COLOR } from '../lib/config';

function Chat({ user, messages, loading, logout }) {

  const chatContainer = useRef(null);

  useEffect(() => {
    if (chatContainer)
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
  }, [messages]);

  let currentDate = messages.length ? new Date(messages[0].date).toLocaleDateString() : null;

  return (
    <Box minH="100vh">
      {!user.token && <Redirect to={{ pathname: '/login' }} />}
      <ChatNavbar photoUrl={user.photoUrl} logout={logout} >
        <Text fontSize="1.25rem">Chat</Text>
      </ChatNavbar>
      <Stack ref={chatContainer} direction="column" h="calc(100vh - 136px)" spacing={3} overflow="auto" p={3} >
        {loading && <Progress colorScheme={ACCENT_COLOR} size="xs" isIndeterminate />}
        {messages.map((message, i) => {
          const messageDate = new Date(message.date).toLocaleDateString();
          let showDate = false;
          if (i === 0 || messageDate !== currentDate) {
            currentDate = messageDate;
            showDate = true;
          }
          return <Message showDate={showDate} key={message._id} message={message} user={user} />
        })}
      </Stack>
      <MessageInput user={user} />
    </Box >
  );
}

export default Chat;