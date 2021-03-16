import React, { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

interface ConfirmActionProps {
  isOpen: boolean
  onClose: () => void
  action: () => void
  title: string
  description: string
  primary: string
}

function ConfirmAction({ isOpen, onClose, action, title, description, primary }: ConfirmActionProps) {

  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>
            {description}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Annulla
            </Button>
            <Button colorScheme="red" onClick={action} ml={3}>
              {primary}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default ConfirmAction;