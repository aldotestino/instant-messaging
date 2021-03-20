import React from 'react';
import Layout from '../components/Layout';
import { Formik, Form, Field } from 'formik';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, Stack, Text, Link as CLink, Button, Heading, useColorModeValue, useToast, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { validateLoginArgs } from '../utils/authHelpers';
import { gql, useMutation } from '@apollo/client';
import { useAuth } from '../store';
import { LoginMutation, LoginMutationVariables } from '../__generated__/LoginMutation';
import { COLOR_SCHEME } from '../utils/config';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        avatar
      }
    }
  }
`;

function Login() {

  const { setAuth, isAuth } = useAuth();
  const history = useHistory();
  const toast = useToast();

  const [login, { loading }] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN_MUTATION, {
    onCompleted: ({ login }) => {
      localStorage.setItem('token', login?.token!);
      setAuth(login);
      history.push('/chat');
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

  const color = useColorModeValue(`${COLOR_SCHEME}.500`, `${COLOR_SCHEME}.200`);

  const initialValues: LoginMutationVariables = {
    username: '',
    password: ''
  };

  return (
    <>
      {isAuth && <Redirect to="/chat" />}
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

              <FormControl isInvalid={formik.touched.username && !!formik.errors.username}>
                <InputGroup>
                  <InputLeftElement children={<AtSignIcon />} />
                  <Input as={Field} type="text" placeholder="Username" name="username" id="username" />
                </InputGroup>
                <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.touched.password && !!formik.errors.password}>
                <InputGroup>
                  <InputLeftElement children={<LockIcon />} />
                  <Input as={Field} type="password" placeholder="Password" name="password" id="password" />
                </InputGroup>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>

              <Button type="submit" colorScheme={COLOR_SCHEME} isLoading={loading}>Login</Button>
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

export default Login;