import React, { useState } from 'react';
import { Flex, Input, IconButton, } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import { gql, useMutation } from '@apollo/client';
import { PostMutation, PostMutationVariables } from '../__generated__/PostMutation';
import { COLOR_SCHEME } from '../utils/config';

const POST_MUTATION = gql`
  mutation PostMutation($content: String!) {
    post(content: $content) {
      id
    }
  }
`;

function MessageInput() {

  const [input, setInput] = useState('');

  const [post, { loading }] = useMutation<PostMutation, PostMutationVariables>(POST_MUTATION);

  return (
    <form onSubmit={e => {
      e.preventDefault();
      const content = input.trim();
      if(!input) {
        return;
      }
      post({
        variables: {
          content
        }
      });
      setInput('');
    }}>
      <Flex width="full" p={3}>
        <Input onChange={e => setInput(e.target.value)} value={input} size="lg" placeholder="Scrivi un messaggio" autoComplete="off" name="content" />
        <IconButton isLoading={loading} aria-label="send-message" type="submit" size="lg" colorScheme={COLOR_SCHEME} ml={3}
          icon={<ArrowUpIcon w="30px" h="30px" />} />
      </Flex >
    </form>
  );
}

export default MessageInput;