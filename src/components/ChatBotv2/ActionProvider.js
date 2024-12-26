// ActionProvider.js
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleHello() {
    const message = this.createChatBotMessage(
      "Hello! How can I assist you today?"
    );
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }
}

export default ActionProvider;
