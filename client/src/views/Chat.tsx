import React, { useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../store';
import MessageInput from '../components/MessageInput';
import { Grid, Progress, Stack } from '@chakra-ui/react';
import { gql, useQuery } from '@apollo/client';
import isElectron from 'is-electron';
import { MessagesQuery } from '../__generated__/MessagesQuery';
import Message from '../components/Message';
import { COLOR_SCHEME } from '../utils/config';
let ipcRenderer: any;
if(isElectron()) {
  ipcRenderer = window.require('electron').ipcRenderer;
}

const MESSAGES_QUERY = gql`
  query MessagesQuery {
    messages {
      id
      content
      createdAt
      user {
        id
        username
        avatar
      }
    }
  }
`;

const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription NewMessageSubscription {
    newMessage {
      id
      content
      createdAt
      user {
        id
        username
        avatar
      }
    }
  }
`;

let currentDate = '';

function Chat() {

  const { isAuth, auth } = useAuth();
  const chatRef = useRef<HTMLSpanElement>(null);

  const { data, loading, subscribeToMore } = useQuery<MessagesQuery>(MESSAGES_QUERY);

  subscribeToMore({
    document: NEW_MESSAGE_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }: any) => {
      if(!subscriptionData.data) {
        return prev;
      }
      const { newMessage } = subscriptionData.data;
      const exists = prev.messages.find(
        ({ id }) => id === newMessage.id
      );
      if (exists) return prev;
      if(isElectron() && newMessage.user.id !== auth?.user?.id) {
        ipcRenderer.send('@notifications/new_message', {
          content: newMessage.content,
          user: {
            username: newMessage.user.username,
            avatar: newMessage.user.avatar
          }
        });
      }
      return {
        ...prev,
        messages: [...prev.messages, newMessage]
      };
    }
  });

  useEffect(() => {
    chatRef.current?.scrollIntoView({ 'behavior': 'auto' });
  }, [data]);

  return (
    <>
      {!isAuth && <Redirect to="/" />}
      <Grid templateRows="1fr auto" h="calc(100vh - 64px)">
        {loading && <Progress isIndeterminate colorScheme={COLOR_SCHEME} size="xs" />}
        <Stack spacing="3" overflowY="auto" px="3">
          {data?.messages.map((m, i) => {
            const messageDate = new Date(m.createdAt).toLocaleDateString();
            let showDate = false;
            if (i === 0 || messageDate !== currentDate) {
              currentDate = messageDate;
              showDate = true;
            }
            return <Message key={m.id} message={m} showDate={showDate}/>;
          })}
          <span style={{ margin: 0 }} ref={chatRef}></span>
        </Stack>
        <MessageInput />
      </Grid>
    </>
  );
}

export default Chat;
