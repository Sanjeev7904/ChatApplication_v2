import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from '../Context/ChatProvider';
import MyChats from '../components/miscellaneous/MyChats';
import ChatBox from '../components/miscellaneous/ChatBox';


const ChatPage = () => {

  const { user } = ChatState();
  const[fetchAgain , setFetchAgain]=useState(false);

  
  
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        height: "91.5vh",
        padding: "10px"
      }}
      >
      
       {user && <MyChats fetchAgain={fetchAgain} />}
      {user && (<ChatBox  fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>)} 
       
      
      </Box>
    </div>
  );
};

export default ChatPage;
