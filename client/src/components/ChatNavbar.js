import React from 'react';
import { Flex, Spacer, Avatar, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom'
import ColorModeSwitcher from './ColorModeSwitcher';

function ChatNavbar({ photoUrl, children, logout }) {
  return (
    <Flex px={3} align="center" height="64px" shadow="lg">
      {children}
      <Spacer />
      <Flex alignItems="center">
        <ColorModeSwitcher mr={4} />
        <Menu>
          <MenuButton cursor="pointer" as={Avatar} size="md" src={photoUrl} />
          <MenuList>
            <MenuItem as={RouterLink} to="/profile">Profilo</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}

export default ChatNavbar;