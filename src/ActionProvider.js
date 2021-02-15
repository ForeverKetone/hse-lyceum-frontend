class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  timeHandler = () => {
    const message = this.createChatBotMessage("Текущее время в Москве:",{
      widget: "time"
    });
    this.addMessageToBotState(message)
  }

  apiHandler = (word) => {
    fetch(`https://hse-lyc.herokuapp.com/api/query?`+ new URLSearchParams({
        question: word
      })
    )
      .then(response => response.json())
        .then(json => this.createChatBotMessage(json.bot_message))
          .then(message => {this.addMessageToBotState(message);});

  }

  addMessageToBotState = (message) => {
   if (Array.isArray(message)) {
     this.setState((state) => ({
       ...state,
       messages: [...state.messages, ...message],
     }));
   } else {
     this.setState((state) => ({
       ...state,
       messages: [...state.messages, message],
     }));
   }
   var messages = JSON.parse(localStorage.getItem("chat_messages"))
   messages.push(message)
   localStorage.setItem("chat_messages", JSON.stringify(messages));
 };
}

export default ActionProvider;
