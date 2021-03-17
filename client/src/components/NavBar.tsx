import React, { useMemo } from 'react';
import { Avatar, Button, Flex, Menu, MenuButton, IconButton, MenuItem, MenuList, Spacer, Stack, Text, useColorModeValue, useColorMode, MenuDivider } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import ColorModeSwitcher from './ColorModeSwitcher';
import { useAuth } from '../store';

function NavBar() {

  const location = useLocation();
  const isHome = useMemo(() => location.pathname === '/', [location]);
  const isChat = useMemo(() => location.pathname === '/chat', [location]);
  const isProfile = useMemo(() => location.pathname.includes('/profile'), [location]);
  const { auth, logout, isAuth } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  return(
    <Flex px={3} align="center" height="16" transition="all .2s ease" bg={useColorModeValue('white', 'gray.800')}>
      {isChat ? 
        <Text fontSize="x-large">Chat</Text>: 
        isProfile ?
          <IconButton aria-label="to-chat" as={Link} to="/chat" variant="ghost" icon={<ArrowBackIcon w="25px" h="25px" />} /> :
          <Link to="/">
            <Text fontSize="1.25rem">Instant Messaging</Text>
          </Link>}
      <Spacer />
      <Stack direction="row" align="center">
        {!isAuth && <ColorModeSwitcher />}
        {isHome && <Button as={Link} to="/login">Login</Button> }
        {(!isHome && isAuth) && <Menu>
          <MenuButton >
            <Avatar src={auth?.user?.avatar|| ''} name={auth?.user?.username} />
          </MenuButton>
          <MenuList>
            <MenuItem b>Registrato come <br/> @{auth?.user?.username}</MenuItem>
            <MenuDivider />
            <MenuItem as={Link} to="/profile" >Impostazioni account</MenuItem>
            <MenuItem as={Link} to="/profile/change-password">Cambia password</MenuItem>
            <MenuItem onClick={toggleColorMode}>Usa tema {colorMode === 'dark' ? 'chiaro' : 'scuro'}</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </MenuList>
        </Menu>}
      </Stack>
    </Flex>
  );
}

export default NavBar;