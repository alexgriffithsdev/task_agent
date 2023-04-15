import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import Message from "./Message.jsx";
import "./chat.css";
import axios from "axios";
import { Button } from "@chakra-ui/react";

const Chat = ({ getTasks }) => {
  const [showChat, setShowChat] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessages = [
        ...messages,
        { id: Date.now(), type: "sent", content: inputValue },
      ];

      setMessages(newMessages);
      setLoading(true);

      axios
        .post("http://localhost:3001/send-message", {
          message: inputValue,
        })
        .then((res) => {
          setMessages([
            ...newMessages,
            { id: Date.now(), type: "received", content: res.data },
          ]);

          getTasks();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });

      setInputValue("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowChat(!showChat)}
        className="bg-blue-500 text-white p-4 rounded-full focus:outline-none"
      >
        <i className="far fa-comment-dots"></i>
      </button>
      <CSSTransition
        in={showChat}
        timeout={300}
        classNames="chat"
        unmountOnExit
        appear
      >
        <div className="absolute right-0 bottom-16 w-80 bg-white shadow-lg rounded-md p-4">
          <div className="h-60 overflow-y-scroll">
            {messages.map((message) => (
              <Message
                key={message.id}
                type={message.type}
                content={message.content}
              />
            ))}
          </div>
          <div className="mt-4 flex items-center">
            <input
              type="text"
              value={inputValue}
              disabled={loading}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-2 mr-4 border-2 border-blue-500 rounded-md focus:outline-none"
              placeholder="Type your message..."
            />
            <Button
              onClick={handleSendMessage}
              colorScheme="blue"
              isLoading={loading}
              isDisabled={loading}
            >
              Send
            </Button>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Chat;
