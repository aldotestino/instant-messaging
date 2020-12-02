import React, { useEffect, useRef } from 'react';
import { Box, Stack, Text, Progress } from '@chakra-ui/react';
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
      <Stack ref={chatContainer} direction="column" h="calc(100vh - 136px)" spacing={3} overflow="auto" p={3} >
        {!messages.length && <Progress colorScheme="purple" size="xs" isIndeterminate />}
        {messages.map(message => <Message key={message._id} message={message} user={user} />)}
      </Stack>
      <MessageInput user={user} />
    </Box >
  );
}

export default Chat;