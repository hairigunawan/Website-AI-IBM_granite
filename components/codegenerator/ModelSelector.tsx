"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface ModelSelectorProps {
  selected: string;
  setSelected: (id: "free" | "pro") => void;
}

export default function ModelSelector({ selected, setSelected }: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const options = [
    {
      id: "pro",
      title: "IBM Granite Pro",
      description: "Model paling pintar & bertenaga",
      badge: "Tingkatkan",
      icon: <Sparkles className="w-4 h-4 text-yellow-400" />,
    },
    {
      id: "free",
      title: "IBM Granite Free",
      description: "Cocok untuk tugas sehari-hari",
      icon: <span className="w-4 h-4 text-gray-400">⚪</span>,
    },
  ];

  // Tutup dropdown kalau klik di luar
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleSelect = (id: "free" | "pro") => {
    if (id === "pro") {
      // 🔹 Kalau pilih Pro → alihkan ke halaman login
      router.push("/login"); 
    } else {
      setSelected(id);
    }
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(prev => !prev)}
        className="flex items-center text-sm gap-2 px-3 py-1 text-black/50 rounded-lg hover:bg-gray-300"
      >
        {options.find(o => o.id === selected)?.title || "Pilih Model"}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute mt-2 w-64 bg-gray-900 rounded-xl shadow-lg border border-gray-700 z-50 overflow-hidden"
          >
            {options.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id as "free" | "pro")}
                className={`flex items-start gap-3 w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors ${
                  selected === opt.id ? "bg-gray-800" : ""
                }`}
              >
                <div className="mt-1">{opt.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{opt.title}</p>
                  <p className="text-xs text-gray-400">{opt.description}</p>
                </div>
                {opt.badge ? (
                  <span className="text-xs px-2 py-1 rounded-md bg-indigo-600 text-white">
                    {opt.badge}
                  </span>
                ) : selected === opt.id ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : null}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
