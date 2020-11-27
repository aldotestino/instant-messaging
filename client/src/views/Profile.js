import React, { useState } from 'react';
import {
  Box,
  useToast,
  Flex,
  Stack,
  Text,
  Button,
  Avatar,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton
} from '@chakra-ui/react';
import { AtSignIcon, ArrowBackIcon, ViewIcon } from '@chakra-ui/icons'
import { Redirect, Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ChatNavbar from '../components/ChatNavbar';
import { api } from '../lib/api';


function Profile({ user, setUser, setMessages }) {

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      newUsername: user.username,
      newPhotoUrl: user.photoUrl
    }
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  function logout() {
    setUser({
      username: '',
      token: '',
      _id: '',
      photoUrl: ''
    });
    setMessages([]);
  }

  async function onSubmit(values) {
    setLoading(true);
    const updatedUser = await api({ endpoint: 'user/update', method: 'PATCH', values, token: user.token });
    setLoading(false);
    if (updatedUser.error) {
      setValue('newUsername', user.username)
      setValue('newPhotoUrl', user.photoUrl)
      toast({
        position: 'top',
        title: 'Si è verificato un errore!',
        description: updatedUser.error,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    } else {
      setUser(updatedUser);
    }
  }

  return (
    <Box minH="100vh">
      {!user.token && <Redirect to={{ pathname: '/login' }} />}
      <ChatNavbar photoUrl={user.photoUrl}>
        <IconButton as={RouterLink}
          to="/chat" variant="ghost"
          icon={<ArrowBackIcon w="25px" h="25px" />} />
      </ChatNavbar>
      <Flex justify="center">
        <Stack mt="50px" spacing={5}>
          <Avatar size="2xl" alignSelf="center" src={user.photoUrl} />
          <Text textAlign="center" fontSize="42px">Profilo</Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack width="300px" spacing={3}>
              <InputGroup>
                <InputLeftElement children={<AtSignIcon />} />
                <Input type="text" placeholder="Username" name="newUsername"
                  ref={register({ required: true })} />
              </InputGroup>
              <InputGroup>
                <InputLeftElement children={<ViewIcon />} />
                <Input type="url" placeholder="Avatar" name="newPhotoUrl"
                  ref={register} />
              </InputGroup>
              <Button isLoading={loading} colorScheme="purple" type="submit">Aggiorna</Button>
              <Button as={RouterLink} to="/profile/password">Cambia password</Button>
              <Button type="button" onClick={logout}>Logout</Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </Box>
  );
}

export default Profile;