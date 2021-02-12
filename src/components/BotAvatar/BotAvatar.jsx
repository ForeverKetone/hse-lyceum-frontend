import React from "react";

import { ReactComponent as BotIcon } from "../../assets/icons/bot.svg";

const BotAvatar = () => {
  return (
    <div className="react-chatbot-kit-chat-bot-avatar">
      <div className="react-chatbot-kit-chat-bot-avatar-container">
        <BotIcon className="react-chatbot-kit-chat-bot-avatar-icon" />
      </div>
    </div>
  );
};

export default BotAvatar;
