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
  useToast
} from '@chakra-ui/react'
import { EmailIcon, AtSignIcon, LockIcon, ViewIcon } from '@chakra-ui/icons'
import { useForm } from 'react-hook-form';
import { Link as RouterLink, Redirect, useHistory } from 'react-router-dom';
import DefaultNavbar from '../components/DefaultNavbar';
import { api } from '../lib/api';

function Register({ user }) {

  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const toast = useToast();

  async function onSubmit(values) {
    setLoading(true);
    const usr = await api({ endpoint: 'user/register', method: 'POST', values });
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
      toast({
        title: 'Registrazione effettuata!',
        description: `Abbiamo inviato una mail a "${usr.message}" per la conferma del tuo account.`,
        duration: '5000',
        status: 'success',
        isClosable: 'true',
        position: 'top'
      });
      history.push('/login');
    }
  }

  return (
    <Box minH="100vh">
      {user.token && <Redirect to={{ pathname: '/chat' }} />}
      <DefaultNavbar />
      <Flex justify="center">
        <Stack mt="50px" spacing={5}>
          <Text textAlign="center" fontSize="42px">Registrati</Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack width="300px" spacing={3}>
              <InputGroup>
                <InputLeftElement children={<EmailIcon />} />
                <Input type="email" placeholder="Email" name="email"
                  ref={register({ required: true })} />
              </InputGroup>
              <InputGroup>
                <InputLeftElement children={<AtSignIcon />} />
                <Input type="text" placeholder="Username" name="username"
                  ref={register({ required: true })} />
              </InputGroup>
              <InputGroup>
                <InputLeftElement children={<LockIcon />} />
                <Input type="password" placeholder="Password"
                  name="password" ref={register({ required: true })} />
              </InputGroup>
              <InputGroup>
                <InputLeftElement children={<ViewIcon />} />
                <Input type="url" placeholder="Avatar" name="photoUrl" ref={register} />
              </InputGroup>
              <Button isLoading={loading} colorScheme="purple" type="submit">Registrati</Button>
              <Text>
                Possiedi già un account?&nbsp;
                <Link as={RouterLink} color="purple.300" to="/login">Effettua il login!</Link>
              </Text>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </Box>
  );
}

export default Register;