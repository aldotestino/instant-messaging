import React from 'react';
import { Stack, Flex, Text, Avatar } from '@chakra-ui/react';

function Message({ message, user }) {

  const date = new Date(message.date).toLocaleString().slice(0, -3);

  if (message.user_id === user._id)
    return (
      <Stack alignSelf="flex-end"
        color="white" p={3} bg="blue.800" rounded="lg" spacing={1} maxW="250px" shadow="lg">
        <Text fontSize="18px">{message.content}</Text>
        <Text color="gray.300" textAlign="right" fontSize="14px">{date}</Text>
      </Stack>
    );

  return (
    <Flex>
      <Avatar src={message.author.photoUrl} name={message.author.username} mr={2} />
      <Stack color="white" p={3} bg="blue.700" rounded="lg" spacing={1} maxW="250px" shadow="lg">
        <Text fontSize="20px" fontWeight="bold">{message.author.username}</Text>
        <Text fontSize="18px">{message.content}</Text>
        <Text color="gray.300" textAlign="right" fontSize="14px">{date}</Text>
      </Stack>
    </Flex>
  );
}

export default Message;