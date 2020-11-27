import React, { useEffect, useRef } from 'react';
import { Box, Grid, Text, Progress } from '@chakra-ui/react';
import { Redirect } from 'react-router-dom';
import ChatNavbar from '../components/ChatNavbar';
import MessageInput from '../components/MessageInput';
import Message from '../components/Message';

function Chat({ user, messages }) {

  const chatContainer = useRef(null);

  useEffect(() => {
    if (chatContainer)
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
  }, [messages]);

  return (
    <Box minH="100vh">
      {!user.token && <Redirect to={{ pathname: '/login' }} />}
      <ChatNavbar photoUrl={user.photoUrl} >
        <Text fontSize="1.25rem">Chat</Text>
      </ChatNavbar>
      <Grid ref={chatContainer} gap={5} h="calc(100vh - 136px)" overflow="auto" spacing={3} p={3} >
        {!messages.length && <Progress colorScheme="purple" size="xs" isIndeterminate />}
        {messages.map(message => <Message key={message._id} message={message} user={user} />)}
      </Grid>
      <MessageInput user={user} />
    </Box >
  );
}

export default Chat;