import React from 'react';
import Layout from '../components/Layout';
import { Formik, Form, Field } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { EmailIcon, AtSignIcon, LockIcon, ViewIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, Stack, Text, Link as CLink, Button, Heading, useColorModeValue, useToast } from '@chakra-ui/react';
import { validateSignupArgs } from '../utils/authHelpers';
import { gql, useMutation } from '@apollo/client';
import { SignupMutation, SignupMutationVariables } from '../__generated__/SignupMutation';
import { COLOR_SCHEME } from '../utils/config';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $username: String!, $password: String!, $avatar: String) {
    signup(email: $email, username: $username, password: $password, avatar: $avatar)
  }
`;

function Signup() {

  const toast = useToast();
  const history = useHistory();

  const [signup, { loading }] = useMutation<SignupMutation, SignupMutationVariables>(SIGNUP_MUTATION, {
    onCompleted: () => {
      history.push('/login');
    },
    onError: () => {
      toast({
        title: 'Errore',
        description: 'Utente già esistente',
        status: 'error',
        duration: 3000,
        position: 'top-right',
        isClosable: true
      });
    }
  });

  const initialValues: SignupMutationVariables = {
    email: '',
    username: '',
    password: '',
    avatar: ''
  };

  const color = useColorModeValue(`${COLOR_SCHEME}.500`, `${COLOR_SCHEME}.200`);
  const errorColor = useColorModeValue('red.500', 'red.200');

  return (
    <Layout>
      <Heading fontStyle="italic">Signup</Heading>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          signup({
            variables: values
          });
        }}
        validate={validateSignupArgs}
      >
        {formik => <Form>
          <Stack spacing="3" w="xs">

            <InputGroup>
              <InputLeftElement children={<EmailIcon />} />
              <Input as={Field} type="text" placeholder="Email" name="email" id="email" />
            </InputGroup>
            {formik.touched.email && formik.errors.email ? (
              <Text color={errorColor}>{formik.errors.email}</Text>
            ) : null}

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

            <InputGroup>
              <InputLeftElement children={<ViewIcon />} />
              <Input as={Field} type="text" placeholder="Avatar" name="avatar" id="avatar" />
            </InputGroup>
            {formik.touched.avatar && formik.errors.avatar ? (
              <Text color={errorColor}>{formik.errors.avatar}</Text>
            ) : null}

            <Button type="submit" colorScheme={COLOR_SCHEME} isLoading={loading}>Signup</Button>
            <Text>Possiedi già un account?&nbsp;
              <CLink as={Link} color={color} to="/login">Effettua il login!</CLink>
            </Text>
          </Stack>
        </Form>}
      </Formik>
    </Layout>
  );
}

export default Signup;