import { LockIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, Stack, useColorModeValue, Text, Button, Heading, useToast } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../store';
import { validateChangePasswordArgs } from '../utils/authHelpers';
import { gql, useMutation } from '@apollo/client';
import { ChangePasswordMutation, ChangePasswordMutationVariables } from '../__generated__/ChangePasswordMutation';

const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePasswordMutation($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;

function Profile() {

  const { isAuth } = useAuth();
  const errorColor = useColorModeValue('red.500', 'red.200');
  const toast = useToast();

  const [changePassword, { loading }] = useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(CHANGE_PASSWORD_MUTATION, {
    onError: () => {
      toast({
        title: 'Errore',
        description: 'Password errata',
        status: 'error',
        duration: 3000,
        position: 'top-right',
        isClosable: true
      });
    }
  });

  const initialValues: ChangePasswordMutationVariables = {
    oldPassword: '',
    newPassword: ''
  };

  return (
    <>
      {!isAuth && <Redirect to="/login" />}
      <Layout>
        <Heading fontStyle="italic">Cambia password</Heading>
        <Formik
          initialValues={initialValues}
          onSubmit={values => {
            changePassword({
              variables: values
            });
          }}
          validate={validateChangePasswordArgs}
        >
          {formik => <Form>
            <Stack spacing="3" w="xs">

              <InputGroup>
                <InputLeftElement children={<LockIcon />} />
                <Input as={Field} type="password" placeholder="Vecchia password" name="oldPassword" id="oldPassword" />
              </InputGroup>
              {formik.touched.oldPassword && formik.errors.oldPassword ? (
                <Text color={errorColor}>{formik.errors.oldPassword}</Text>
              ) : null}

              <InputGroup>
                <InputLeftElement children={<LockIcon />} />
                <Input as={Field} type="password" placeholder="Nuova password" name="newPassword" id="newPassword" />
              </InputGroup>
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <Text color={errorColor}>{formik.errors.newPassword}</Text>
              ) : null}

              <Button type="submit" isLoading={loading}>Aggiorna</Button>
            </Stack>
          </Form>}
        </Formik>
      </Layout>
    </>
  );
}

export default Profile;