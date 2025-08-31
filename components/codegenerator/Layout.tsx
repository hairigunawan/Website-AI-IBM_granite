'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import { ChatSession, ChatMessage } from '../../types/chat';
import ModelSelector from "./ModelSelector";

const Layout: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<"free" | "pro">("free");
  const [isProUser, setIsProUser] = useState(false); // 🔹 status login

  useEffect(() => {
    // cek apakah sudah login pro
    const isPro = localStorage.getItem("isProUser");
    if (isPro === "true") {
      setIsProUser(true);
      setSelectedModel("pro");
    } else {
      setIsProUser(false);
      setSelectedModel("free");
    }

    if (chats.length === 0) {
      handleNewChat();
    }
  }, []);

  const handleNewChat = () => {
    const newChat: ChatSession = {
      id: `chat-${Date.now()}`,
      title: `Sesi Obrolan #${chats.length + 1}`,
      messages: [],
    };
    setChats(prev => [...prev, newChat]);
    setActiveChatId(newChat.id);
    setShowSidebar(false);
  };

  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
    setShowSidebar(false);
  };

  const updateMessagesForActiveChat = (
    updater: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])
  ) => {
    if (!activeChatId) return;
    setChats(prevChats =>
      prevChats.map(chat => {
        if (chat.id !== activeChatId) return chat;

        const newMessages =
          typeof updater === "function"
            ? (updater as (prev: ChatMessage[]) => ChatMessage[])(chat.messages)
            : updater;

        let newTitle = chat.title;
        if (chat.title.startsWith("Sesi Obrolan") && newMessages.length > 0) {
          const firstUserMsg = newMessages.find(m => m.sender === "user");
          const firstAiMsg = newMessages.find(m => m.sender === "ai" && m.text !== "...");
          
          if (firstUserMsg && firstAiMsg) {
            const userSnippet = firstUserMsg.text.split(" ").slice(0, 5).join(" ");
            const aiSnippet = firstAiMsg.text.split(" ").slice(0, 5).join(" ");
            newTitle = `${userSnippet} / ${aiSnippet}...`;
          } else if (firstUserMsg) {
            const words = firstUserMsg.text.split(" ");
            newTitle = words.slice(0, 6).join(" ");
            if (words.length > 6) newTitle += "...";
          }
        }

        return { ...chat, messages: newMessages, title: newTitle };
      })
    );
  };

  const clearMessagesForActiveChat = () => {
    if (!activeChatId) return;
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === activeChatId ? { ...chat, messages: [] } : chat
      )
    );
  };

  const clearAllChats = () => {
    setChats([]);
    setActiveChatId(null);
  };

  const activeChat = chats.find(chat => chat.id === activeChatId);

  const handleAuthClick = () => {
    if (isProUser) {
      // Logout
      localStorage.removeItem("isProUser");
      setIsProUser(false);
      setSelectedModel("free");
    } else {
      // Login → ke halaman login
      window.location.href = "/login";
    }
  };

  return (
    <div className="container flex h-screen text-gray-200 overflow-hidden">
      <Sidebar 
        showSidebar={showSidebar} 
        onClose={() => setShowSidebar(false)}
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onClearAll={clearAllChats}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between gap-4 p-4 flex-shrink-0 mx-5">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="md:hidden bg-gray-800 p-2 rounded-lg hover:bg-gray-700 text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <ModelSelector selected={selectedModel} setSelected={setSelectedModel} />

          <div className="flex items-center gap-4">
            {activeChat && (
              <button
                onClick={clearMessagesForActiveChat}
                className="text-sm text-gray-500 hover:text-red-500"
              >
                Clear Chat
              </button>
            )}

            {/* 🔹 Auth button: Login / Logout */}
            <button
              onClick={handleAuthClick}
              className="text-sm font-medium text-gray-500 bg-gray-300 p-1.5 px-4 rounded-xl hover:text-gray-100 hover:bg-gray-400 transition-colors"
            >
              {isProUser ? "Logout" : "Login"}
            </button>
          </div>
        </header>
              
        {activeChat ? (
          <ChatWindow 
            key={activeChat.id}
            messages={activeChat.messages}
            setMessages={updateMessagesForActiveChat}
            model={selectedModel}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>Pilih obrolan atau mulai yang baru.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
