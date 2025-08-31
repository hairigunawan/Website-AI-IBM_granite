'use client'

import { motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

const CodeDemo = () => {
    const codeElementRef = useRef<HTMLElement>(null);
    const cursorRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const codeString = `
<span class="text-sky-400">import</span> requests

<span class="text-sky-400">def</span> <span class="text-green-400">get_api_data</span>(api_url):
    <span class="text-gray-500">"""
    Fetches data from an API and handles potential errors.
    """</span>
    <span class="text-sky-400">try:</span>
        response = requests.get(api_url, timeout=10)
        response.raise_for_status()
        <span class="text-sky-400">return</span> response.json()
    <span class="text-sky-400">except</span> requests.exceptions.RequestException <span class="text-sky-400">as</span> err:
        <span class="text-green-400">print</span>(<span class="text-orange-400">f"An Error Occurred: {err}"</span>)
    <span class="text-sky-400">return</span> <span class="text-purple-400">None</span>`;

        let currentIndex = 0;
        let timeoutId: NodeJS.Timeout;

        const typeWriterEffect = () => {
            if (currentIndex < codeString.length && codeElementRef.current) {
                const char = codeString.charAt(currentIndex);
                if (char === '<') {
                    const tagEndIndex = codeString.indexOf('>', currentIndex);
                    codeElementRef.current.innerHTML += codeString.substring(currentIndex, tagEndIndex + 1);
                    currentIndex = tagEndIndex;
                } else {
                    codeElementRef.current.innerHTML += char;
                }
                currentIndex++;
                timeoutId = setTimeout(typeWriterEffect, 15);
            } else if (cursorRef.current) {
                cursorRef.current.style.display = 'none';
            }
        };
        
        const startTimeoutId = setTimeout(typeWriterEffect, 1000);
        return () => {
            clearTimeout(timeoutId);
            clearTimeout(startTimeoutId);
        };
    }, []);

    return (
        <motion.section
            id="demo"
            className="mb-16 md:mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <div className="max-w-3xl mx-auto bg-[#1f1f1f] rounded-xl shadow-2xl overflow-hidden">
                <div className="h-8 bg-gray-600 flex items-center px-4 space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="p-6 font-mono text-sm text-gray-200 max-h-[300px] overflow-y-auto overflow-x-auto">
                    <p className="mb-4">
                        <span className="text-cyan-400">&gt; </span>
                        <span className="text-slate-300">Buatkan fungsi python untuk fetch data dari API dan handle error.</span>
                    </p>
                    <pre>
                        <code ref={codeElementRef} className="bg-cyan-500 bg-clip-text text-transparent"></code>
                        <span ref={cursorRef} className="cursor"></span>
                    </pre>
                </div>
            </div>
        </motion.section>
    );
};

export default CodeDemo;