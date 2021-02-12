import React, { useState } from "react";
import { Chatbot } from 'react-chatbot-kit'
import { ConditionallyRender } from "react-util-kit";

import { ReactComponent as Chat } from "./assets/icons/bot.svg";

import MessageParser from './MessageParser'
import ActionProvider from './ActionProvider'
import config from './config'

import './App.css';

function App() {
  const [showChatbot, toggleChatbot] = useState(true);
  
  return (
    <div className="App">
      <div className="app-chatbot-container">
        <ConditionallyRender
            ifTrue={showChatbot}
            show={
              <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
              />
            }
        />
      </div>

      <button
        className="app-chatbot-button"
        onClick={() => toggleChatbot((prev) => !prev)}
      >
        <Chat className="app-chatbot-button-icon" />
      </button>
    </div>
  );
}

export default App;
