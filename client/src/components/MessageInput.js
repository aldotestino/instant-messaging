import React from 'react';
import { Flex, Input, IconButton, } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons'
import { useForm } from 'react-hook-form';
import { api } from '../lib/api';
import { ACCENT_COLOR } from '../lib/config';


function MessageInput({ user }) {

  const { register, handleSubmit, reset } = useForm();

  async function onSubmit(_values) {
    const values = _values;
    reset();
    const { error } = await api({ endpoint: 'messages', method: 'POST', values, token: user.token });
    if (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex width="full" p={3}>
        <Input size="lg" placeholder="Scrivi un messaggio"
          ref={register({ required: true })}
          autoComplete="off"
          name="content" />
        <IconButton type="submit" size="lg" colorScheme={ACCENT_COLOR} ml={3}
          icon={<ArrowUpIcon w="30px" h="30px" />} />
      </Flex >
    </form>
  );
}

export default MessageInput;