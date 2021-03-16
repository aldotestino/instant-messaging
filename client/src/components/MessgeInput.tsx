import React, { useState } from 'react';
import { Flex, Input, IconButton, } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';

function MessageInput() {

  const [input, setInput] = useState('');

  return (
    <form onSubmit={() => {
      const content = input.trim();
      if(!input) {
        return;
      }
      console.log(content);
      setInput('');
    }}>
      <Flex width="full" p={3}>
        <Input onChange={e => setInput(e.target.value)} size="lg" placeholder="Scrivi un messaggio" autoComplete="off" name="content" />
        <IconButton aria-label="send-message" type="submit" size="lg" colorScheme="purple" ml={3}
          icon={<ArrowUpIcon w="30px" h="30px" />} />
      </Flex >
    </form>
  );
}

export default MessageInput;