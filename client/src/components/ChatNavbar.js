import React from 'react';
import { Flex, Spacer, Avatar } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom'
import ColorModeSwitcher from './ColorModeSwitcher';

function ChatNavbar({ photoUrl, children }) {
  return (
    <Flex px={3} align="center" height="64px" shadow="lg">
      {children}
      <Spacer />
      <Flex alignItems="center">
        <ColorModeSwitcher mr={4} />
        <Avatar as={RouterLink} to="/profile" size="md" src={photoUrl} />
      </Flex>
    </Flex>
  );
}

export default ChatNavbar;