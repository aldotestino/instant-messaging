import React, { useRef } from 'react';
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from '@chakra-ui/react';

interface ConfirmActionProps {
  isOpen: boolean
  onClose: () => void
  action: () => void
  title: string
  description: string
  primary: string,
  loading: boolean
}

function ConfirmAction({ isOpen, onClose, action, title, description, primary, loading }: ConfirmActionProps) {

  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="2xl" fontStyle="italic" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>
            {description}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Annulla
            </Button>
            <Button colorScheme="red" isLoading={loading} onClick={action} ml={3}>
              {primary}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default ConfirmAction;