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
import { ACCENT_COLOR } from '../lib/config';

function Login({ user, setUser }) {

  const { register, handleSubmit, errors, reset } = useForm();
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
        <Stack my="50px" spacing={5}>
          <Text textAlign="center" fontSize="42px">Login</Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack width="300px" spacing={3}>
              <InputGroup>
                <InputLeftElement children={<AtSignIcon />} />
                <Input type="text" placeholder="Username" name="username"
                  ref={register({ required: true, minLength: 2 })} />
              </InputGroup>
              {errors.username &&
                <Text as="small" color="red.400">
                  {errors.username.type === 'minLength' ? 'Username deve contenere almeno due caratteri' :
                    'Questo campo è obbligatorio'}
                </Text>}
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
              <Checkbox name="remember" ref={register} colorScheme={ACCENT_COLOR}>Ricordami</Checkbox>
              <Button disabled={errors.username || errors.password || loading} isLoading={loading}
                colorScheme={ACCENT_COLOR} type="submit">Login</Button>
              <Text>
                Non hai un account?&nbsp;
                <Link as={RouterLink} color={`${ACCENT_COLOR}.300`} to="/register">Registrati!</Link>
              </Text>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </Box>
  );
}

export default Login;