import React from "react";
import Chatbot from "react-chatbotify";
// import "react-chatbotify/build/assets/css/index.css";

import config from "./chatbotConfig";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
const ChatBot = () => {
  console.log("work");
  return (
    <div>
      <div className="border-4 border-red-600 z-30 fixed bottom-0 right-0">
        ChatBot
        <header className="App-header">
          <h1>My Chatbot</h1>
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </header>
      </div>
    </div>
  );
};

export default ChatBot;
