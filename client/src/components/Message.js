import React from 'react';
import { Stack, Flex, Text, Avatar } from '@chakra-ui/react';

function Message({ message, user }) {

  if (message.user_id === user._id)
    return (
      <Stack justifySelf="flex-end"
        color="white" p={3} bg="blue.800" rounded="lg" spacing={1} maxW="270px" shadow="lg">
        <Text fontSize="18px">{message.content}</Text>
        <Text fontSize="14px">{new Date(message.date).toLocaleString()}</Text>
      </Stack>
    );

  return (
    <Flex>
      <Avatar src={message.author.photoUrl} name={message.author.username} mr={2} />
      <Stack color="white" p={3} bg="blue.700" rounded="lg" spacing={1} maxW="270px" shadow="lg">
        <Text fontSize="20px" fontWeight="bold">{message.author.username}</Text>
        <Text fontSize="18px">{message.content}</Text>
        <Text fontSize="14px">{new Date(message.date).toLocaleString()}</Text>
      </Stack>
    </Flex>
  );
}

export default Message;