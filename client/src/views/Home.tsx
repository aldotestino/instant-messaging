import { Button, Heading, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';
import Layout from '../components/Layout';

function Home() {
  return (
    <Layout>
      <Heading>Instant Messaging</Heading>
      <Text fontSize="1.5rem">Chat Better, chat Faster</Text>
      <Stack direction="row" justifyContent="space-around">
        <Button as="a"
          target="_blank"
          href="https://github.com/aldotestino/instant-messaging"
          variant="outline">Follow On Github</Button>
        <Button as={Link} to="/signup" colorScheme="purple">
            Registrati
        </Button>
      </Stack>
    </Layout>
  );
}

export default Home;