'use client';

import React, { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { FiPlus, FiMic, FiFileText, FiX, FiTrash2, FiClock, FiSend } from 'react-icons/fi';
import { SiProbot } from "react-icons/si";
import { FaUserCircle } from "react-icons/fa";

// Interface untuk struktur data setiap item riwayat di panel kanan
interface HistoryLogItem {
  id: string;
  prompt: string;
  fileName: string;
  output: string;
  timestamp: string;
}

// Interface untuk struktur data setiap pesan dalam percakapan
interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  file?: File;
  isLoading?: boolean;
}

// ========= PERUBAHAN DI SINI: Nama komponen diubah menjadi CodeGenerator ==========
const CodeGenerator: React.FC = () => {
  // State untuk menyimpan file yang akan diunggah
  const [file, setFile] = useState<File | null>(null);
  // State untuk menyimpan teks prompt dari pengguna
  const [prompt, setPrompt] = useState<string>('');
  // State untuk menandakan proses loading
  const [isLoading, setIsLoading] = useState(false);
  // State untuk menyimpan riwayat percakapan di panel kanan
  const [historyLog, setHistoryLog] = useState<HistoryLogItem[]>([]);
  // State untuk menyimpan pesan chat yang ditampilkan di antarmuka utama
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  // State untuk menampilkan/sembunyikan panel riwayat di mobile
  const [showHistory, setShowHistory] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Memuat riwayat dari localStorage saat komponen pertama kali dirender
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('aiChatHistoryLog');
      if (savedHistory) {
        setHistoryLog(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Gagal memuat riwayat dari localStorage:', error);
    }
  }, []);

  // Menyimpan riwayat ke localStorage setiap kali ada perubahan
  useEffect(() => {
    try {
      localStorage.setItem('aiChatHistoryLog', JSON.stringify(historyLog));
    } catch (error) {
      console.error('Gagal menyimpan riwayat ke localStorage:', error);
    }
  }, [historyLog]);
  
  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);


  // Fungsi untuk menangani perubahan input file
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Fungsi untuk menghapus file yang dipilih
  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Fungsi utama untuk mengirim prompt dan mendapatkan respons
  const handleGenerate = async () => {
    if (!file && !prompt.trim()) {
      return;
    }
    
    setIsLoading(true);

    const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: prompt,
        file: file || undefined,
    };

    const thinkingMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: 'Thinking...',
        isLoading: true,
    };
    
    // Tambahkan pesan pengguna dan pesan "Thinking..." ke chat
    setChatMessages(prev => [...prev, userMessage, thinkingMessage]);
    
    // Simpan prompt dan file untuk API call, lalu reset state
    const currentPrompt = prompt;
    const currentFile = file;
    setPrompt('');
    setFile(null);

    try {
      const formData = new FormData();
      if (currentFile) {
        formData.append('file', currentFile);
      }
      formData.append('prompt', currentPrompt);

      // Memanggil endpoint API '/api/generate'
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
        throw new Error(errorData.message);
      }

      const data = await response.json();
      const result = data.result || 'Tidak ada hasil yang valid dari API.';

      // Update pesan "Thinking..." dengan hasil dari API
      setChatMessages(prev => prev.map(msg => 
        msg.id === thinkingMessage.id ? { ...msg, text: result, isLoading: false } : msg
      ));
      
      // Membuat dan menyimpan log riwayat untuk panel kanan
      const newHistoryLogItem: HistoryLogItem = {
        id: Date.now().toString(),
        prompt: currentPrompt || `File: ${currentFile?.name}`,
        fileName: currentFile ? currentFile.name : 'Hanya teks',
        output: result,
        timestamp: new Date().toLocaleString('id-ID'),
      };
      
      setHistoryLog(prev => [newHistoryLogItem, ...prev].slice(0, 20));

    } catch (error) {
      const errorMessage = `Error: ${error instanceof Error ? error.message : 'Terjadi kesalahan tidak dikenal.'}`;
      // Update pesan "Thinking..." dengan pesan error
      setChatMessages(prev => prev.map(msg => 
        msg.id === thinkingMessage.id ? { ...msg, text: errorMessage, isLoading: false } : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading && (prompt.trim() || file)) {
      e.preventDefault();
      handleGenerate();
    }
  }
  
  const handleSelectHistory = (item: HistoryLogItem) => {
    const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: item.prompt,
    };
     const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: item.output,
    };
    setChatMessages([userMessage, aiMessage]);
    setShowHistory(false);
  };
  
  const handleDeleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHistoryLog(prev => prev.filter(item => item.id !== id));
  };
  
  const handleClearHistory = () => {
    if (confirm('Apakah Anda yakin ingin menghapus semua riwayat?')) {
      setHistoryLog([]);
    }
  };

  return (
    // ... sisa kode JSX tidak perlu diubah ...
    <div className="bg-gray-900 text-gray-200 flex h-screen">
      {/* --- Panel Riwayat (Sidebar Kanan) --- */}
      <div className={`
        ${showHistory ? 'block' : 'hidden'} 
        md:block w-full md:w-80 bg-gray-800 border-l border-gray-700
        absolute md:relative inset-y-0 right-0 z-20 md:z-auto
        flex flex-col h-full
      `}>
        <div className="p-4 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4 flex-shrink-0">
            <h2 className="font-medium text-gray-300">Riwayat</h2>
            {historyLog.length > 0 && (
              <button 
                onClick={handleClearHistory}
                className="text-xs text-red-400 hover:text-red-300 flex items-center"
                title="Hapus semua riwayat"
              >
                <FiTrash2 className="mr-1 w-3 h-3" /> Hapus semua
              </button>
            )}
          </div>
          
          <div className="flex-1 overflow-auto">
            {historyLog.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FiClock className="mx-auto w-8 h-8 mb-2 opacity-50" />
                <p>Belum ada riwayat</p>
              </div>
            ) : (
              <div className="space-y-3">
                {historyLog.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-3 bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={() => handleSelectHistory(item)}
                  >
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium text-gray-200 truncate flex-1 min-w-0">{item.prompt || "(Tanpa judul)"}</p>
                      <button 
                        onClick={(e) => handleDeleteHistoryItem(item.id, e)}
                        className="text-gray-500 hover:text-red-400 ml-2 flex-shrink-0"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{item.timestamp}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>


      {/* --- Antarmuka Chat Utama --- */}
      <div className="flex-1 flex flex-col h-screen">
        <header className="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0">
            <h1 className="text-lg font-semibold">Model AI Anda</h1>
            <button 
              onClick={() => setShowHistory(!showHistory)} 
              className="md:hidden bg-gray-800 p-2 rounded-lg hover:bg-gray-700 z-30">
              {showHistory ? <FiX className="w-5 h-5" /> : <FiClock className="w-5 h-5" />}
            </button>
        </header>

        {/* Area Pesan Chat */}
        <main ref={chatContainerRef} className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto">
            {chatMessages.length === 0 ? (
                 <div className="text-center text-gray-500 mt-20">
                    <SiProbot className="w-16 h-16 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-300">Mulai Percakapan</h2>
                    <p>Tanyakan apa saja atau unggah file untuk memulai.</p>
                 </div>
            ) : (
                <div className="space-y-6">
                    {chatMessages.map(msg => (
                        <div key={msg.id} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                            {msg.sender === 'ai' && (
                                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                                    <SiProbot className="w-5 h-5 text-white" />
                                </div>
                            )}
                             <div className={`max-w-lg p-4 rounded-xl ${
                                msg.sender === 'user' 
                                ? 'bg-gray-700 text-gray-200' 
                                : 'bg-gray-800 border border-gray-700/50 text-gray-300'
                            }`}>
                                <pre className="whitespace-pre-wrap text-sm font-sans">{msg.text}</pre>
                                {msg.file && (
                                     <div className="flex items-center mt-2 p-2 bg-gray-600/50 rounded-md">
                                        <FiFileText className="w-4 h-4 mr-2 text-indigo-400 flex-shrink-0" />
                                        <span className="text-xs text-indigo-400 truncate">{msg.file.name}</span>
                                     </div>
                                )}
                                {msg.isLoading && (
                                    <div className="flex items-center space-x-2 mt-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-400"></div>
                                        <span className="text-xs text-gray-400">Memproses...</span>
                                    </div>
                                )}
                            </div>
                             {msg.sender === 'user' && (
                                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                    <FaUserCircle className="w-5 h-5 text-white" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            </div>
        </main>
        
        {/* Input Area */}
        <footer className="p-4 flex-shrink-0">
          <div className="max-w-3xl mx-auto">
            <div className="relative bg-gray-800 rounded-xl shadow-lg p-3 border border-gray-700 flex items-center">
              <label 
                htmlFor="file-upload" 
                className="p-2 cursor-pointer rounded-lg hover:bg-gray-700 flex-shrink-0"
                title={file ? 'Ganti file' : 'Unggah file'}
              >
                {file ? <FiFileText className="h-5 w-5 text-indigo-400" /> : <FiPlus className="h-5 w-5 text-gray-400" />}
              </label>
              <input
                id="file-upload"
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              
              <div className="flex-1 flex flex-col ml-2">
                <input
                  type="text"
                  className="w-full bg-transparent text-white placeholder-gray-500 text-md focus:outline-none"
                  placeholder="Tanyakan apapun..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                {file && (
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-indigo-400 truncate max-w-xs">{file.name}</span>
                    <button 
                      onClick={handleRemoveFile}
                      className="ml-2 text-gray-500 hover:text-red-400"
                    >
                      <FiX className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <button 
                  type="button" 
                  className="p-2 rounded-lg hover:bg-gray-700"
                  title="Fitur suara (coming soon)"
                >
                  <FiMic className="h-5 w-5 text-gray-400" />
                </button>
                <button
                  type="button"
                  className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  onClick={handleGenerate}
                  disabled={isLoading || (!prompt.trim() && !file)}
                  title="Generate"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <FiSend className="w-5 h-5"/>
                  )}
                </button>
              </div>
            </div>
             <p className="text-xs text-gray-600 text-center mt-2">AI dapat membuat kesalahan. Harap periksa kembali respons yang penting.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CodeGenerator;