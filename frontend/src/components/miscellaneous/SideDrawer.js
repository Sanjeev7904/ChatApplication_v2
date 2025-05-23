
import React, { useState } from 'react'; 
import {
  Tooltip,
  Button,
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  useDisclosure,
  useToast

} from '@chakra-ui/react';

import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
 import  ProfileModels from "./ProfileModal"
import { ChatState } from '../../Context/ChatProvider';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ChatLoading from '../ChatLoading.js';
import UserListItem from '../UserAvatar/UserListItem.js';
import { Spinner } from '@chakra-ui/react';



 







const SideDrawer = () => {
   const [search, setSearch] = useState("");
   const [loading, setLoading] = useState(false);  // Added loading state
   const [searchResult, setSearchResult] = useState([]); 
   const [loadingChat, setLoadingChat] = useState();

   const { user , setSelectedChat , chats , setChats} = ChatState();

   const history = useHistory();
   const {  isOpen , onOpen , onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo")
    
    history.push("/");
  }
  const toast =useToast();
  
  const handleSearch = async () => {  // Made handleSearch async
    if (!search) {
      toast({
        title: "Please enter something in Search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,  // Fixed the Authorization header format
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);  
      setLoading(false);
      setSearchResult(data);  
    } catch (error) {
      setLoading(false);  // Set loading to false on error
      toast({
        title: "Error occurred",
        description: "Failed to load the search result",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  
  };

  const accessChat = async (userId) =>{
  try{
   setLoadingChat(true);
    
   const config ={
   headers :{
    "Content-type":"application/json",
     Authorization:`Bearer ${user.token}`,
 }
};
   const {data} = await axios.post("/api/chat", {userId} , config);
   if(!chats.find((c) => c._id === data._id)) setChats([data , ...chats]);
   
   
   setSelectedChat(data);
   setLoadingChat(false); 
    onClose();

  }catch(error){
    toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",


  });}

}

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" w="100%" p="5px 10px 5px 10px" borderWidth="5px" bg="white">
        <Tooltip label="Search users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px="4">Search User</Text>
          </Button>
        </Tooltip>

         <Text fontSize="2xl" fontFamily="Work sans">Talk-A-Tive</Text>

        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} />
            </MenuButton>

             <MenuList>
              
             <ProfileModels user={user}>
                <MenuItem>MY Profile</MenuItem>
              </ProfileModels>
              
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>LogOut</MenuItem>
            </MenuList> 
          </Menu>
        </div> 
      </Box>


      <Drawer placement="left"  onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
        <DrawerCloseButton /> 
          <DrawerHeader>Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder='Search by name or email'
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button 
              onClick={handleSearch}
              
              > 
                Go 
              </Button>
            </Box>
            
            {
           loading ? (
            <ChatLoading/>

           ) :(
                  searchResult?.map(user => (
                   <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={()=>accessChat(user._id)}
                />


                  ))
             

           ) }

         {loadingChat && < Spinner ml ="auto" display="flex"/>}

          </DrawerBody>
        </DrawerContent>
      </Drawer> 
      
      
      
     
        
        
    </> 
  );
}


export default SideDrawer ;
