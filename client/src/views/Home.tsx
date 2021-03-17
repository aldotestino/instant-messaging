import { Button, Heading, Stack, Text } from '@chakra-ui/react';
import { Link, Redirect } from 'react-router-dom';
import React from 'react';
import Layout from '../components/Layout';
import { COLOR_SCHEME } from '../utils/config';
import { useAuth } from '../store';

function Home() {

  const { isAuth } = useAuth();

  return (
    <>
      {isAuth && <Redirect to="/chat" />}
      <Layout>
        <Heading>Instant Messaging</Heading>
        <Text fontSize="1.5rem">Chat Better, chat Faster</Text>
        <Stack direction="row" justifyContent="space-around">
          <Button as="a"
            target="_blank"
            href="https://github.com/aldotestino/instant-messaging"
            variant="outline">Follow On Github</Button>
          <Button as={Link} to="/signup" colorScheme={COLOR_SCHEME}>
            Registrati
          </Button>
        </Stack>
      </Layout>
    </>
  );
}

export default Home;