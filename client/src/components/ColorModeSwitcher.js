import React from 'react';
import { useColorMode, Switch } from '@chakra-ui/react';
import { ACCENT_COLOR } from '../lib/config';

function ColorModeSwitcher(props) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Switch
      size="lg"
      isChecked={colorMode === 'dark' ? true : false}
      colorScheme={ACCENT_COLOR}
      onChange={toggleColorMode}
      {...props}
    />
  );
}

export default ColorModeSwitcher;
