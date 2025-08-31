import React from 'react';
import { FiPlus, FiMessageSquare, FiSearch, FiX, FiTrash2 } from 'react-icons/fi';
import { ChatSession } from '../../types/chat';

interface Props {
  showSidebar: boolean;
  onClose: () => void;
  chats: ChatSession[];
  activeChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onClearAll: () => void; 
}

const Sidebar: React.FC<Props> = ({ showSidebar, onClose, chats, activeChatId, onNewChat, onSelectChat, onClearAll }) => {
  return (
    <>
      {showSidebar && <div className="fixed inset-0 bg-black/60 z-20 md:hidden" onClick={onClose}></div>}

      <div
        className={`fixed md:relative top-0 left-0 h-full w-64 bg-neutral-200 border-r z-30 transform transition-transform duration-300 ease-in-out
        ${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 flex flex-col`}
      >
        <div className="p-4 flex flex-col h-full">
          {/* Header Sidebar */}
          <div className="flex justify-between items-center mb-4 flex-shrink-0">
            <h2 className="text-sm text-gray-500 mb-2">Chats</h2>
            <button onClick={onClose} className="md:hidden text-gray-400 hover:text-red-400">
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col space-y-2 mb-10">
            {/* Tombol Obrolan Baru */}
            <button 
              onClick={onNewChat}
              className="flex items-center justify-start space-x-2 px-2 py-2 rounded-lg text-gray-700 hover:bg-gray-300 flex-shrink-0"
            >
              <FiPlus className="w-5 h-5 text-gray-700" />
              <span className="text-sm">Obrolan Baru</span>
            </button>

            {/* Pencarian */}
            <div className="flex items-center justify-start space-x-2 px-[10px] py-2 rounded-lg text-gray-700 hover:bg-gray-300 flex-shrink-0">
              <FiSearch className="w-4 h-5 text-gray-700 mr-2" />
              <input type="text" placeholder="Search chats" className="bg-transparent text-gray-900 w-full text-sm focus:outline-none" />
            </div>
          </div>

          {/* Daftar Obrolan */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-2">
            <p className="text-sm text-gray-500 mb-4">Daftar Obrolan</p>
            {chats.slice().reverse().map(chat => (
              <button 
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`flex items-center space-x-3 w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                  chat.id === activeChatId ? 'bg-gray-300' : 'hover:bg-gray-300/50'
                }`}
              >
                <span className="truncate flex-1 text-sm text-gray-700">{chat.title}</span>
              </button>
            ))}
          </div>

          {/* Footer Sidebar */}
          <div className="mt-4 border-t border-gray-700 pt-4 flex-shrink-0 space-y-2">
            <button
              onClick={onClearAll}
              className="flex items-center space-x-2 text-sm p-2 text-black/50 hover:text-red-500"
            >
              <FiTrash2 className="w-4 h-4" />
              <span>Hapus Semua Chat</span>
            </button>
            <p className="ml-5 text-[8px] text-gray-500">© 2025 IBM Granite Clone</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
