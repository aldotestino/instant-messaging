import React from 'react';
import { useColorMode, Switch } from '@chakra-ui/react';

function ColorModeSwitcher(props) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Switch
      size="lg"
      isChecked={colorMode === 'dark' ? true : false}
      colorScheme="purple"
      onChange={toggleColorMode}
      {...props}
    />
  );
}

export default ColorModeSwitcher;
