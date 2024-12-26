// chatbotConfig.js
import { createChatBotMessage } from "react-chatbotify";

const botName = "ChatBot";

const config = {
  botName: botName,
  initialMessages: [
    createChatBotMessage(`Hi! I'm ${botName}. How can I help you?`),
  ],
};

export default config;
