import React, { LegacyRef, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../store';
import MessageInput from '../components/MessgeInput';
import { Grid, Progress, Stack } from '@chakra-ui/react';
import { gql, useQuery } from '@apollo/client';
import { MessagesQuery } from '../__generated__/MessagesQuery';
import Message from '../components/Message';
import { COLOR_SCHEME } from '../utils/config';

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

function Chat() {

  const { auth } = useAuth();
  const { data, loading, subscribeToMore } = useQuery<MessagesQuery>(MESSAGES_QUERY);
  const chatRef = useRef<HTMLDivElement>(null);
  
  let currentDate = data?.messages.length ? new Date(data.messages[0].createdAt).toLocaleDateString() : null;

  useEffect(() => {
    if(chatRef.current?.scrollTop) {
      chatRef.current.scrollTop = chatRef.current?.scrollHeight;
    }
  }, [data]);

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
      return {
        ...prev,
        messages: [...prev.messages, newMessage]
      };
    }
  });

  return (
    <>
      {!auth?.token && <Redirect to="/" />}
      <Grid templateRows="1fr auto" h="calc(100vh - 64px)">
        {loading && <Progress isIndeterminate colorScheme={COLOR_SCHEME} size="xs" />}
        <Stack ref={chatRef} spacing="3" overflowY="auto" px="3">
          {data?.messages.map((m, i) => {
            const messageDate = new Date(m.createdAt).toLocaleDateString();
            let showDate = false;
            if (i === 0 || messageDate !== currentDate) {
              currentDate = messageDate;
              showDate = true;
            }
            return <Message key={m.id} message={m} showDate={showDate}/>;
          })}
        </Stack>
        <MessageInput />
      </Grid>
    </>
  );
}

export default Chat;