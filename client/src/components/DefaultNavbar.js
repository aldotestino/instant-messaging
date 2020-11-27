import React from 'react';
import { Flex, Spacer, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import ColorModeSwitcher from './ColorModeSwitcher';

function DefaultNavbar({ children }) {
  return (
    <Flex shadow="lg" px={3} align="center" height="64px">
      <Link to="/"><Text fontSize="1.25rem">Instant Messaging</Text></Link>
      <Spacer />
      <Flex alignItems="center">
        {children}
        <ColorModeSwitcher ml={4} />
      </Flex>
    </Flex>
  );
}

export default DefaultNavbar;