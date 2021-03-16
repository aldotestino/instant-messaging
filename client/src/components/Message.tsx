import React from 'react';
import { Stack, Flex, Text, Avatar } from '@chakra-ui/react';
import { useAuth } from '../store';
import { MessagesQuery_messages } from '../__generated__/MessagesQuery';
import formatDate from '../utils/formatDate';
import { COLOR_SCHEME } from '../utils/config';

interface MessageProps {
  message: MessagesQuery_messages
  showDate: boolean
}

function Message({ message, showDate }: MessageProps) {

  const { auth } = useAuth();
  const isMine = message.user?.id === auth?.user?.id;
  const { time, date } = formatDate(message.createdAt);

  return (
    <>
      {showDate && <Text alignSelf="center" textAlign="center" bgColor="gray.700" color="white" px={3} rounded="full">{date}</Text>}
      <Flex alignSelf={!isMine ? 'flex-start' : 'flex-end'}>
        {!isMine && <Avatar src={message.user?.avatar || ''} name={message.user?.username} mr={2} />}
        <Stack color="white" p={2} bg={`${COLOR_SCHEME}.${isMine ? '400' : '800'}`} rounded="lg" spacing="0" minW="150px" maxW="250px" shadow="lg">
          {!isMine && <Text color="white" fontSize="xl">{message.user?.username}</Text>}
          <Text color="white" fontSize="md">{message.content}</Text>
          <Text color="gray.300" textAlign="right" fontSize="14px">{time}</Text>
        </Stack>
      </Flex>
    </>
  );
}

export default Message;