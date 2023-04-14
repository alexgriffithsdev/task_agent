import React from "react";

const Message = ({ type, content }) => {
  const side = type === "sent" ? "justify-end" : "justify-start";
  const bgColor = type === "sent" ? "bg-blue-500" : "bg-gray-300";

  return (
    <div className={`flex ${side} my-2`}>
      <div className={`px-4 py-2 rounded-lg ${bgColor} text-white`}>
        {content}
      </div>
    </div>
  );
};

export default Message;
