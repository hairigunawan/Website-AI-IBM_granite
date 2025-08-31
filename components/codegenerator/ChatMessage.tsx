import React from 'react';
import { ChatMessage } from '../../types/chat';
import { FaUserCircle } from 'react-icons/fa';
import { SiProbot } from 'react-icons/si';

// Komponen untuk menampilkan bubble pesan tunggal
const ChatMessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex items-start gap-3 mx-10 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {/* Ikon untuk AI */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
          <SiProbot className="text-white" />
        </div>
      )}

      <div
        className={`max-w-xl px-2 py-2 rounded-xl ${
          isUser 
            ? 'text-gray-700 text-sm' 
            : 'text-gray-700 text-sm'
        }`}
      >
        {message.text === '...' ? (
           <span className="animate-pulse">...</span>
        ) : (
           <p className="whitespace-pre-wrap">{message.text}</p>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center flex-shrink-0">
          <FaUserCircle className="text-white" />
        </div>
      )}
    </div>
  );
};

export default ChatMessageBubble;
