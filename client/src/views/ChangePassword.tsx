import { ViewIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement, Stack, useColorModeValue, Text, Button, Heading } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../store';
import { ChangePasswordArgs, validateChangePasswordArgs } from '../utils/auth';

function Profile() {

  const { auth } = useAuth();
  const errorColor = useColorModeValue('red.500', 'red.200');

  const initialValues: ChangePasswordArgs = {
    oldPassword: '',
    newPassword: ''
  };

  return (
    <>
      {!auth?.token && <Redirect to="/login" />}
      <Layout>
        <Heading fontStyle="italic">Cambia password</Heading>
        <Formik
          initialValues={initialValues}
          onSubmit={values => {
            console.log(values);
          }}
          validate={validateChangePasswordArgs}
        >
          {formik => <Form>
            <Stack spacing="3" w="xs">

              <InputGroup>
                <InputLeftElement children={<ViewIcon />} />
                <Input as={Field} type="password" placeholder="Vecchia password" name="oldPassword" id="oldPassword" />
              </InputGroup>
              {formik.touched.oldPassword && formik.errors.oldPassword ? (
                <Text color={errorColor}>{formik.errors.oldPassword}</Text>
              ) : null}

              <InputGroup>
                <InputLeftElement children={<ViewIcon />} />
                <Input as={Field} type="password" placeholder="Nuova password" name="newPassword" id="newPassword" />
              </InputGroup>
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <Text color={errorColor}>{formik.errors.newPassword}</Text>
              ) : null}

              <Button type="submit">Aggiorna</Button>
            </Stack>
          </Form>}
        </Formik>
      </Layout>
    </>
  );
}

export default Profile;