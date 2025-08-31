'use client';

import React, { useRef, useEffect, useState, FormEvent } from 'react';
import ChatMessageBubble from './ChatMessage';
import ChatInput from './ChatInput';
import { ChatMessage } from '../../types/chat';
import { SiProbot } from 'react-icons/si';

interface Props {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  model: "free" | "pro";
}

const ChatWindow: React.FC<Props> = ({ messages, setMessages, model }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: input,
      sender: 'user',
    };

    const aiMessageId = `ai-${Date.now()}`;
    const aiPlaceholder: ChatMessage = { id: aiMessageId, text: '...', sender: 'ai' };

    setMessages(prev => [...prev, userMessage, aiPlaceholder]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input, model }), 
      });

      if (!response.ok || !response.body) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiResponseText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        aiResponseText += decoder.decode(value, { stream: true });

        setMessages(prev =>
          prev.map(msg =>
            msg.id === aiMessageId ? { ...msg, text: aiResponseText } : msg
          )
        );
      }
    } catch (error) {
      console.error('Error fetching stream:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      const errorId = `ai-error-${Date.now()}`;

      setMessages(prev =>
        prev.map(msg =>
          msg.id === aiMessageId
            ? { id: errorId, text: `Maaf, terjadi kesalahan: ${errorMessage}`, sender: 'ai' }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div ref={chatRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-700 mt-20">
            <h2 className="text-2xl font-semibold flex items-center justify-center">
              <SiProbot className="h-20 w-20 pb-[2px] text-zinc-500" />
              </h2>
            <p>Tanyakan apa saja untuk memulai.</p>
          </div>
        ) : (
          messages.map(msg => <ChatMessageBubble key={msg.id} message={msg} />)
        )}
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <ChatInput 
          value={input}
          onChange={handleInputChange}
          isLoading={isLoading}
          onFileUpload={(file) => {
            console.log("File diupload:", file);
          }}
        />
      </form>
    </div>
  );
};

export default ChatWindow;
