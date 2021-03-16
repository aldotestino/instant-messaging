import React from 'react';
import Layout from '../components/Layout';
import { Formik, Form, Field } from 'formik';
import { Link, Redirect } from 'react-router-dom';
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, Stack, Text, Link as CLink, Button, Heading, useColorModeValue, useToast } from '@chakra-ui/react';
import { LoginArgs, validateLoginArgs } from '../utils/auth';
import { gql, useMutation } from '@apollo/client';
import { useAuth } from '../store';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        username
        email
        avatar
      }
    }
  }
`;

function Signup() {

  const { auth, setAuth } = useAuth();
  const toast = useToast();

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: ({ login }) => {
      console.log(login);
      localStorage.setItem('auth', JSON.stringify(login));
      setAuth(login);
    },
    onError: (error) => {
      toast({
        title: 'Errore',
        description: error.message,
        status: 'error',
        duration: 3000,
        position: 'top-right',
        isClosable: true
      });
    }
  });

  const color = useColorModeValue('purple.500', 'purple.200');
  const errorColor = useColorModeValue('red.500', 'red.200');

  const initialValues: LoginArgs = {
    username: '',
    password: ''
  };

  return (
    <>
      {auth?.token && <Redirect to="/chat" />}
      <Layout>
        <Heading fontStyle="italic">Login</Heading>
        <Formik
          initialValues={initialValues}
          onSubmit={values => {
            login({
              variables: values
            });
          }}
          validate={validateLoginArgs}
        >
          {formik => <Form>
            <Stack spacing="3" w="xs">

              <InputGroup>
                <InputLeftElement children={<AtSignIcon />} />
                <Input as={Field} type="text" placeholder="Username" name="username" id="username" />
              </InputGroup>
              {formik.touched.username && formik.errors.username ? (
                <Text color={errorColor}>{formik.errors.username}</Text>
              ) : null}

              <InputGroup>
                <InputLeftElement children={<LockIcon />} />
                <Input as={Field} type="password" placeholder="Password" name="password" id="password" />
              </InputGroup>
              {formik.touched.password && formik.errors.password ? (
                <Text color={errorColor}>{formik.errors.password}</Text>
              ) : null}

              <Button type="submit" colorScheme="purple" isLoading={loading}>Login</Button>
              <Text>Non hai un account?&nbsp;
                <CLink as={Link} color={color} to="/signup">Registrati!</CLink>
              </Text>
            </Stack>
          </Form>}
        </Formik>
      </Layout>
    </>
  );
}

export default Signup;