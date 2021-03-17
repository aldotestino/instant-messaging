import { AtSignIcon, ViewIcon } from '@chakra-ui/icons';
import { Avatar, Input, InputGroup, InputLeftElement, Stack, useColorModeValue, Text, Button, useDisclosure } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../components/Layout';
import ConfirmAction from '../components/ConfirmAction';
import { useAuth } from '../store';
import { UpdateArgs, validateUpdateArgs } from '../utils/authHelpers';

function Profile() {

  const { auth } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const errorColor = useColorModeValue('red.500', 'red.200');

  const initialValues: UpdateArgs = {
    newUsername: auth?.user?.username!,
    newAvatar: auth?.user?.avatar || undefined
  };

  function onDelete() {
    console.log('Account eliminato');
  }

  return (
    <>
      {!auth?.token && <Redirect to="/login" />}
      <ConfirmAction isOpen={isOpen} onClose={onClose} action={onDelete}
        title="Elimina Account" description="Sei sicuro di voler eliminare il tuo account?
        Tutti i tuoi messaggi verranno eliminati." primary="Elimina" />
      <Layout>
        <Formik
          initialValues={initialValues}
          onSubmit={values => {
            console.log(values);
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

              <Button type="submit">Aggiorna</Button>
              <Button colorScheme="red" onClick={onOpen}>Elimina Account</Button>
            </Stack>
          </Form>}
        </Formik>
      </Layout>
    </>
  );
}

export default Profile;