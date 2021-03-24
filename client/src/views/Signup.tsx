import React from 'react';
import Layout from '../components/Layout';
import { Formik, Form, Field } from 'formik';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { EmailIcon, AtSignIcon, LockIcon, ViewIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, Stack, Text, Link as CLink, Button, Heading, useColorModeValue, useToast, FormErrorMessage, FormControl } from '@chakra-ui/react';
import { validateSignupArgs } from '../utils/authHelpers';
import { gql, useMutation } from '@apollo/client';
import { SignupMutation, SignupMutationVariables } from '../__generated__/SignupMutation';
import { COLOR_SCHEME } from '../utils/config';
import { useAuth } from '../store';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $username: String!, $password: String!, $avatar: String) {
    signup(email: $email, username: $username, password: $password, avatar: $avatar)
  }
`;

function Signup() {

  const toast = useToast();
  const history = useHistory();
  const { isAuth } = useAuth();

  const [signup, { loading }] = useMutation<SignupMutation, SignupMutationVariables>(SIGNUP_MUTATION, {
    onCompleted: ({ signup }) => {
      if(signup) {
        toast({
          title: 'Registrazione',
          description: 'Registrazione effettuata con successo! Conferma il tuo account cliccando sul link che ti abbiamo mandato per email',
          status: 'success',
          duration: 3000,
          position: 'top-right',
          isClosable: true
        });
      }
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

  return (
    <>
      {isAuth && <Redirect to="/chat" />}
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

              <FormControl isInvalid={formik.touched.email && !!formik.errors.email}>
                <InputGroup>
                  <InputLeftElement children={<EmailIcon />} />
                  <Input as={Field} type="text" placeholder="Email" name="email" id="email" />
                </InputGroup>
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>

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

              <FormControl isInvalid={formik.touched.avatar && !!formik.errors.avatar}>
                <InputGroup>
                  <InputLeftElement children={<ViewIcon />} />
                  <Input as={Field} type="text" placeholder="Avatar" name="avatar" id="avatar" />
                </InputGroup>
                <FormErrorMessage>{formik.errors.avatar}</FormErrorMessage>
              </FormControl>

              <Button type="submit" colorScheme={COLOR_SCHEME} isLoading={loading}>Signup</Button>
              <Text>Possiedi già un account?&nbsp;
                <CLink as={Link} color={color} to="/login">Effettua il login!</CLink>
              </Text>
            </Stack>
          </Form>}
        </Formik>
      </Layout>
    </>
  );
}

export default Signup;