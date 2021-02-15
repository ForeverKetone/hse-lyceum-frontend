import { createClientMessage } from 'react-chatbot-kit'

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }


  parse(message) {
    var messages = JSON.parse(localStorage.getItem("chat_messages"))
    messages.push(createClientMessage(message))
    localStorage.setItem("chat_messages", JSON.stringify(messages));

    const lowercase = message.toLowerCase()

    if (lowercase.includes("прив")
        | lowercase.includes("здравств")
        | lowercase.includes("добрый")
        | lowercase.includes("hello")) {
      this.actionProvider.helloWorldHandler()
    } else {
      if (lowercase.includes("пасиб")) {
        this.actionProvider.thanksHandler()
      } else{
      if (lowercase.includes("врем")) {
        this.actionProvider.timeHandler()
      }
         else{
          this.actionProvider.otherHandler(lowercase)
        }
      }
    }

    }
}

export default MessageParser;

// new MessageParser(actionProvider, state):
