import React from 'react';
import { Box, Stack, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';
import DefaultNavbar from '../components/DefaultNavbar';
import { ACCENT_COLOR } from '../lib/config';

function Home() {

  return (
    <Box minH="100vh">
      <DefaultNavbar>
        <Button as={RouterLink} to="/login">Login</Button>
      </DefaultNavbar>
      <Flex height="calc(100vh - 64px)" justify="center" align="center">
        <Stack direction="column" mt="-64px" textAlign="center" spacing={3}>
          <Heading>Instant Messaging</Heading>
          <Text fontSize="1.5rem">Chat Better, chat Faster</Text>
          <Stack direction="row" justifyContent="space-around">
            <Button as="a"
              target="_blank"
              href="https://github.com/aldotestino/instant-messaging"
              variant="outline">Follow On Github</Button>
            <Button as={RouterLink} to="/register" colorScheme={ACCENT_COLOR}>
              Registrati
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Box >
  );
}

export default Home;