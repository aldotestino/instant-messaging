import React from 'react';
import {
  useColorMode,
  SwitchProps,
  Switch,
} from '@chakra-ui/react';
import { COLOR_SCHEME } from '../utils/config';

type ColorModeSwitcherProps = Omit<SwitchProps, 'aria-label'>

function ColorModeSwitcher(props: ColorModeSwitcherProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Switch
      size="lg"
      isChecked={colorMode === 'dark' ? true : false}
      colorScheme={COLOR_SCHEME}
      onChange={toggleColorMode}
      {...props}
    />
  );
};

export default ColorModeSwitcher;
