import { AtSignIcon, ViewIcon } from '@chakra-ui/icons';
import { Avatar, Input, InputGroup, InputLeftElement, Stack, useColorModeValue, Text, Button, useDisclosure, useToast } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../components/Layout';
import ConfirmAction from '../components/ConfirmAction';
import { useAuth } from '../store';
import { validateUpdateArgs } from '../utils/authHelpers';
import { gql, useMutation } from '@apollo/client';
import { UpdateMutation, UpdateMutationVariables } from '../__generated__/UpdateMutation';

const UPDATE_MUTATION = gql`
  mutation UpdateMutation($newUsername: String!, $newAvatar: String!) {
    update(newUsername: $newUsername, newAvatar: $newAvatar) {
      id
      username
      avatar
    }
  }
`;

const DELETE_ACCOUNT = gql`
  mutation DeleteAccount {
    deleteAccount
  }
`;

function Profile() {

  const { auth, isAuth, setAuth, logout } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [update, { loading }] = useMutation<UpdateMutation, UpdateMutationVariables>(UPDATE_MUTATION, {
    onCompleted: ({ update }) => {
      setAuth({
        token: auth?.token || null,
        user: {
          id: update?.id!,
          username: update?.username!,
          avatar: update?.avatar || null
        }
      });
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

  const [deleteAccount, { loading: loadingDelete }] = useMutation(DELETE_ACCOUNT);

  const errorColor = useColorModeValue('red.500', 'red.200');

  const initialValues: UpdateMutationVariables = {
    newUsername: auth?.user?.username!,
    newAvatar: auth?.user?.avatar || ''
  };

  async function onDelete() {
    await deleteAccount();
    logout();
  }

  return (
    <>
      {!isAuth && <Redirect to="/login" />}
      <ConfirmAction isOpen={isOpen} onClose={onClose} action={onDelete}
        title="Elimina Account" description="Sei sicuro di voler eliminare il tuo account?
        Tutti i tuoi messaggi verranno eliminati." primary="Elimina" loading={loadingDelete} />
      <Layout>
        <Formik
          initialValues={initialValues}
          onSubmit={values => {
            update({
              variables: values
            });
          }}
          validate={validateUpdateArgs}
        >
          {formik => <Form>
            <Stack spacing="3" w="xs">

              <Avatar alignSelf="center" size="2xl" src={formik.values.newAvatar} name={formik.values.newUsername} />

              <InputGroup>
                <InputLeftElement children={<AtSignIcon />} />
                <Input as={Field} type="text" placeholder="Username" name="newUsername" id="newAvatar" />
              </InputGroup>
              {formik.touched.newUsername && formik.errors.newUsername ? (
                <Text color={errorColor}>{formik.errors.newUsername}</Text>
              ) : null}

              <InputGroup>
                <InputLeftElement children={<ViewIcon />} />
                <Input as={Field} type="text" placeholder="Avatar" name="newAvatar" id="newAvatar" />
              </InputGroup>
              {formik.touched.newAvatar && formik.errors.newAvatar ? (
                <Text color={errorColor}>{formik.errors.newAvatar}</Text>
              ) : null}

              <Button type="submit" isLoading={loading}>Aggiorna</Button>
              <Button colorScheme="red" onClick={onOpen}>Elimina Account</Button>
            </Stack>
          </Form>}
        </Formik>
      </Layout>
    </>
  );
}

export default Profile;