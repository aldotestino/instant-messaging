import React from 'react';
import { Stack, Flex, Text, Avatar } from '@chakra-ui/react';
import formatDate from '../utils/formatDate';

function Message({ message, user, showDate }) {

  const { date, time } = formatDate(message.date);

  if (message.user_id === user._id)
    return (
      <>
        {showDate && <Text alignSelf="center" textAlign="center" bgColor="gray.700" color="white" px={3} rounded="full">{date}</Text>}
        <Stack alignSelf="flex-end"
          color="white" p={2} bg="blue.800" rounded="lg" spacing={1} minW="150px" maxW="250px" shadow="lg">
          <Text fontSize="18px">{message.content}</Text>
          <Text color="gray.300" textAlign="right" fontSize="14px">{time}</Text>
        </Stack>
      </>
    );

  return (
    <>
      {showDate && <Text alignSelf="center" textAlign="center" bgColor="gray.700" color="white" px={3} rounded="full">{date}</Text>}
      <Flex>
        <Avatar src={message.author.photoUrl} name={message.author.username} mr={2} />
        <Stack color="white" p={2} bg="blue.700" rounded="lg" spacing={1} minW="150px" maxW="250px" shadow="lg">
          <Text fontSize="20px" fontWeight="bold">{message.author.username}</Text>
          <Text fontSize="18px">{message.content}</Text>
          <Text color="gray.300" textAlign="right" fontSize="14px">{time}</Text>
        </Stack>
      </Flex>
    </>
  );
}

export default Message;