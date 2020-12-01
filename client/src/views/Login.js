import React, { useState } from 'react';
import {
  Flex,
  Box,
  Stack,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Link,
  useToast,
  Checkbox,
} from '@chakra-ui/react'
import { AtSignIcon, LockIcon } from '@chakra-ui/icons'
import { useForm } from 'react-hook-form';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import DefaultNavbar from '../components/DefaultNavbar';
import { api } from '../lib/api';

function Login({ user, setUser }) {

  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  async function onSubmit(values) {
    const { remember } = values;
    delete values.remember;
    setLoading(true);
    const usr = await api({ endpoint: 'user/login', method: 'POST', values });
    reset();
    setLoading(false);
    if (usr.error) {
      toast({
        position: 'top',
        title: 'Si è verificato un errore!',
        description: usr.error,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    } else {
      setUser(usr);
      if (remember) {
        localStorage.setItem('remember', remember);
        localStorage.setItem('user', JSON.stringify(usr));
      }
    }
  }

  return (
    <Box minH="100vh">
      {user.token && <Redirect to={{ pathname: '/chat' }} />}
      <DefaultNavbar />
      <Flex justify="center">
        <Stack mt="50px" spacing={5}>
          <Text textAlign="center" fontSize="42px">Login</Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack width="300px" spacing={3}>
              <InputGroup>
                <InputLeftElement children={<AtSignIcon />} />
                <Input type="text" placeholder="Username" name="username"
                  ref={register({ required: true })} />
              </InputGroup>
              <InputGroup>
                <InputLeftElement children={<LockIcon />} />
                <Input type="password" placeholder="Password" name="password"
                  ref={register({ required: true })} />
              </InputGroup>
              <Checkbox name="remember" ref={register} colorScheme="purple">Ricordami</Checkbox>
              <Button isLoading={loading} colorScheme="purple" type="submit">Login</Button>
              <Text>
                Non hai un account?&nbsp;
                <Link as={RouterLink} color="purple.300" to="/register">Registrati!</Link>
              </Text>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </Box>
  );
}

export default Login;