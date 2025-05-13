import React from 'react';
import './App.css';
import Homepage from './page/Homepage.js';
import ChatPage from './page/chatPage.js'
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>

      <Route path="/"   component={Homepage } exact/>
        <Route path="/chats" component={ChatPage} />

      </Switch>
        
        
      
    </div>
  );
}

export default App;
