import React, { useState } from "react";
import { Chatbot, createChatBotMessage ,createClientMessage } from 'react-chatbot-kit'
import BotAvatar from "./components/BotAvatar/BotAvatar";
import Time from './components/Time/Time'
import { ConditionallyRender } from "react-util-kit";

import { ReactComponent as Chat } from "./assets/icons/bot.svg";

import MessageParser from './MessageParser'
import ActionProvider from './ActionProvider'

import './App.css';

function App() {
  const [showChatbot, toggleChatbot] = useState(false);

  const saveMessages = (messages) => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  };
  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem("chat_messages"));
    return messages;
  };

  if (localStorage.getItem("startDate") === null){
    localStorage.setItem("startDate", new Date())
  } else {
    if (Math.abs(new Date() - Date.parse(localStorage.getItem('startDate')))>86400000){
      localStorage.clear()
    }
  }

  var initialMessages = []
  if (loadMessages()){
    for (const value of loadMessages().values()) {
      if (value['type'] === 'bot'){
        initialMessages.push(createChatBotMessage(value['message']));
      } else{
        initialMessages.push(createClientMessage(value['message']));
      }
    }
  } else {
    localStorage.setItem('chat_messages', JSON.stringify([createChatBotMessage("Здравствуйте!\nЯ Бот Лицея Вышки, буду рад ответить на самые частозадаваемые вопросы о поступлении!")]))
    initialMessages.push(createChatBotMessage("Здравствуйте!\nЯ Бот Лицея Вышки, буду рад ответить на самые частозадаваемые вопросы о поступлении!"));
  }

  var config = {
    botName: "Бот Лицея Вышки",
    initialMessages: initialMessages,
    customComponents: {
      botAvatar: (props) => <BotAvatar {...props} />,
    },
    customStyles: {
      chatButton: {
        color: "0050CF",
        backgroundColor: "fff",
      },
    },
    state: {
      time: []
    },
    widgets:[
      {
        widgetName: "time",
        widgetFunc: (props) => <Time {...props} />,
        mapStateToProps: ["time"],
      }
    ]
  }

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
                saveMessages={saveMessages}
              />
            }
        />
      </div>

      <button
        className="app-chatbot-button"
        onClick={() => {
                        var messages = loadMessages();
                        toggleChatbot((prev) => !prev);
                        saveMessages(messages);
                        }
                }
      >
        <Chat className="app-chatbot-button-icon" />
      </button>
    </div>
  );
}

export default App;
