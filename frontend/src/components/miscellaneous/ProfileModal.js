


import React from 'react';


import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  IconButton,
  Image,   
  Text     
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';




const ProfileModels = ({ user , children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}

      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
        fontSize="40px"
        fontFamily="Work sans"
        display="flex"
        justifyContent="center"
          
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
          flexDir="column"
          alignItems="center"
          display="flex"
          justifyContent="space-between"
          
          
          >
           < Image
            borderRadius="full"
            boxSize="150px"
            src={user.pic}
            alt={user.name}
            />
            <Text
            fontSize={{base:"28px" ,md:"30px"}}
            fontFamily="work sans"
            
            >
                Email :{user.email}



            </Text>


          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModels;


