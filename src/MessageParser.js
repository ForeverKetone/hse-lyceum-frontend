class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    console.log(message)
    console.log(this.state)
    const lowercase = message.toLowerCase()

    if (lowercase.includes("привет")
        | lowercase.includes("здравств")
        | lowercase.includes("добрый ") 
        | lowercase.includes("hello")) {
      this.actionProvider.helloWorldHandler()
    } else{
      if (lowercase.includes("врем")) {
        this.actionProvider.timeHandler()
      } else{
        if (lowercase.includes("пасиб")) {
          this.actionProvider.thanksHandler()
        } else{
          this.actionProvider.otherHandler(lowercase)
        }
      }
    }

    }
}

export default MessageParser;

// new MessageParser(actionProvider, state):
