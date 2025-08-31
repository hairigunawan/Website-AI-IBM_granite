import React, { useRef, useState } from 'react';
import { FiSend, FiMic, FiPaperclip, FiFile, FiX } from 'react-icons/fi';

interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  onFileUpload?: (file: File) => void;
}

const ChatInput: React.FC<Props> = ({ value, onChange, isLoading, onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewFile(file);

      // kalau gambar → generate preview
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleSendFile = () => {
    if (previewFile && onFileUpload) {
      onFileUpload(previewFile);
      setPreviewFile(null);
      setPreviewUrl(null);
    }
  };

  return (
    <div className="mb-4 flex flex-col items-center justify-center w-full">
      {/* Preview File */}
      {previewFile && (
        <div className="mb-1 border rounded-lg w-full max-w-2xl flex pr-3 items-center gap-3">
          {previewUrl ? (
            <img src={previewUrl} alt="preview" className="h-16 rounded-md" />
          ) : (
            <FiFile className="text-white text-3xl" />
          )}
          <div className="flex-1">
            <p className="text-black/50 text-xs truncate">{previewFile.name}</p>
            <p className="text-gray-400 text-xs">{(previewFile.size / 1024).toFixed(1)} KB</p>
          </div>
          <button
            onClick={() => {
              setPreviewFile(null);
              setPreviewUrl(null);
            }}
            className=""
          >
            <FiX className="text-gray-500" />
          </button>
        </div>
      )}

      {/* Input Bar */}
      <div className="flex items-center w-full max-w-2xl border-1 rounded-2xl px-3 py-4 mb-1">
        {/* Tombol Upload File */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2 hover:bg-gray-700 rounded-lg mr-2"
          disabled={isLoading}
        >
          <FiPaperclip className="text-gray-500" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Input text */}
        <input
          className="flex-1 bg-transparent text-sm text-gray-500 focus:outline-none px-2"
          placeholder="Ask anything..."
          value={value}
          onChange={onChange}
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              (e.target as HTMLInputElement).form?.requestSubmit();
            }
          }}
        />

        {/* Tombol Mic */}
        <button
          type="button"
          className="p-2 hover:bg-gray-700 rounded-lg"
          disabled={isLoading}
        >
          <FiMic className="text-gray-400" />
        </button>

        {/* Tombol Kirim Teks */}
        <button
          type="submit"
          className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!value.trim() || isLoading}
        >
          <FiSend className="text-white" />
        </button>
      </div>

      <p className="text-xs text-gray-400">
        AI Code dapat membuat kesalahan, jadi periksa kembali responsnya
      </p>
    </div>
  );
};

export default ChatInput;
