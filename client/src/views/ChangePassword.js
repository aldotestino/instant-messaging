import React, { useState } from 'react';
import {
  Box,
  useToast,
  Flex,
  Stack,
  Text,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton
} from '@chakra-ui/react';
import { ArrowBackIcon, LockIcon } from '@chakra-ui/icons'
import { Redirect, Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ChatNavbar from '../components/ChatNavbar';
import { api } from '../lib/api';


function ChangePassword({ user }) {

  const { register, handleSubmit, errors, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function onSubmit(values) {
    setLoading(true);
    const response = await api({ endpoint: 'user/update/password', method: 'PATCH', values, token: user.token });
    setLoading(false);
    if (response.error) {
      toast({
        position: 'top',
        title: 'Si è verificato un errore!',
        description: response.error,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    } else {
      toast({
        position: 'top',
        title: 'Cambio password!',
        description: response.message,
        status: 'success',
        duration: 5000,
        isClosable: true
      });
    }
    reset();
  }

  return (
    <Box minH="100vh">
      {!user.token && <Redirect to={{ pathname: '/login' }} />}
      <ChatNavbar photoUrl={user.photoUrl}>
        <IconButton as={RouterLink}
          to="/profile" variant="ghost"
          icon={<ArrowBackIcon w="25px" h="25px" />} />
      </ChatNavbar>
      <Flex justify="center">
        <Stack mt="50px" spacing={5}>
          <Text textAlign="center" fontSize="42px">Password</Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack width="300px" spacing={3}>
              <InputGroup>
                <InputLeftElement children={<LockIcon />} />
                <Input type="password" placeholder="Password" name="password"
                  ref={register({ required: true, minLength: 5 })} />
              </InputGroup>
              {errors.password &&
                <Text as="small" color="red.400">
                  {errors.password.type === 'minLength' ? 'Password deve contenere almeno cinque caratteri' :
                    'Questo campo è obbligatorio'}
                </Text>}
              <InputGroup>
                <InputLeftElement children={<LockIcon />} />
                <Input type="password" placeholder="Nuova password" name="newPassword"
                  ref={register({ required: true, minLength: 5 })} />
              </InputGroup>
              {errors.newPassword &&
                <Text as="small" color="red.400">
                  {errors.newPassword.type === 'minLength' ? 'Password deve contenere almeno cinque caratteri' :
                    'Questo campo è obbligatorio'}
                </Text>}
              <Button disabled={errors.password || errors.newPassword}
                isLoading={loading} colorScheme="purple" type="submit">Aggiorna</Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </Box>
  );
}

export default ChangePassword;