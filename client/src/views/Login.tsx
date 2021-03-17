import React from 'react';
import Layout from '../components/Layout';
import { Formik, Form, Field } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, Stack, Text, Link as CLink, Button, Heading, useColorModeValue, useToast } from '@chakra-ui/react';
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
        email
        avatar
      }
    }
  }
`;

function Login() {

  const { setAuth } = useAuth();
  const history = useHistory();
  const toast = useToast();

  const [login, { loading }] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN_MUTATION, {
    onCompleted: ({ login }) => {
      localStorage.setItem('auth', JSON.stringify(login));
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
  const errorColor = useColorModeValue('red.500', 'red.200');

  const initialValues: LoginMutationVariables = {
    username: '',
    password: ''
  };

  return (
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

            <Button type="submit" colorScheme={COLOR_SCHEME} isLoading={loading}>Login</Button>
            <Text>Non hai un account?&nbsp;
              <CLink as={Link} color={color} to="/signup">Registrati!</CLink>
            </Text>
          </Stack>
        </Form>}
      </Formik>
    </Layout>
  );
}

export default Login;