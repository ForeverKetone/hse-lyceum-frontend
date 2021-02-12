class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  helloWorldHandler = () => {
    const message = this.createChatBotMessage("Здравствуйте!\nВы задать мне любой вопрос о поступлении в Лицей")
    this.setChatbotMessage(message)
  }

  timeHandler = () => {
    const message = this.createChatBotMessage("Текущее время в Москве:",{
      widget: "time"
    });
    this.setChatbotMessage(message);
  }

  thanksHandler = () => {
    const message = this.createChatBotMessage("Рад помочь!");
    this.setChatbotMessage(message);
  }

  otherHandler = (word) => {
    const encodedValue = encodeURIComponent(word);
    fetch(`https://hse-lyc.herokuapp.com/api/query?`+ new URLSearchParams({
        question: word
      })
    )
      .then(response => response.json())
        .then(json => this.createChatBotMessage(json.time))
          .then(message => this.setChatbotMessage(message));
  }

  setChatbotMessage = (message) => {
    this.setState(state => ({...state, messages: [...state.messages, message]}))
  }
}

export default ActionProvider;
