import React from 'react'
import {Container, Box ,Text ,Tab, TabList ,TabPanel, TabPanels,Tabs} from "@chakra-ui/react"
import Login from '../components/Authentication/Login.js'
import Signup from '../components/Authentication/Signup.js'
import { useHistory } from 'react-router-dom';

import { useEffect} from "react";
const Homepage = () => {
  const history = useHistory();
  

  useEffect(()=>{
   const user=JSON.parse(localStorage.getItem("userInfo"));

   if(user) {
    
    history.push('/chats');
    
   }
  }, [history]);

  return (
    <Container>
   <Box
    display="flex"
    justifyContent="center"
    p={3}
    bg={"white"}
    w="100%"
    m="40px 0 15px 0"
    borderRadius="lg"
    borderWidth ="1px"  
   >
     <Text fontSize="4xl" fontFamily="Work sans" color="black">Talk-A-Tive</Text>
</Box>

<Box
   bg={"white"}
    p={3}
   w="100%"
    m="40px 0 15px 0"
    borderRadius="lg"
    borderWidth ="1px"  
   >
    <Tabs variant="soft-rounded" >
  <TabList mb="1em">
    <Tab width="50%">Login</Tab>
    <Tab width="50%">Sign Up</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
      
      {<Login/>}
    </TabPanel>
    <TabPanel>
     
     {<Signup/>}
    </TabPanel>
  </TabPanels>
</Tabs> 
     
</Box>





    </Container>
    
  )
}

export default Homepage
