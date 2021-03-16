import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../store';
import MessageInput from '../components/MessgeInput';
import { Box, Grid, Stack } from '@chakra-ui/react';

function Chat() {

  const { auth } = useAuth();

  return (
    <>
      {!auth?.token && <Redirect to="/" />}
      <Grid templateRows="1fr auto" h="calc(100vh - 64px)">
        <Stack spacing="3" overflowY="auto">
          {Array.from({ length: 100 }).map((p, i) => <div>{i}</div>)}
        </Stack>
        <MessageInput />
      </Grid>
    </>
  );
}

export default Chat;