import { Stack } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <Stack direction="column" align="center" justify="center" mt="16" spacing="3">
      {children}
    </Stack>
  );
}

export default Layout;