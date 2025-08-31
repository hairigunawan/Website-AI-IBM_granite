'use client'

import { motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

const CodeDemo = () => {
    const codeElementRef = useRef<HTMLElement>(null);
    const cursorRef = useRef<HTMLSpanElement>(null);

useEffect(() => {
  const codeString = `
<span class="text-sky-400">import</span> Replicate <span class="text-sky-400">from</span> <span class="text-orange-400">"replicate"</span>;

<span class="text-sky-400">const</span> replicate = <span class="text-sky-400">new</span> Replicate({
  auth: process.env.<span class="text-green-400">REPLICATE_API_TOKEN</span>,
});

<span class="text-sky-400">const</span> input = {
  top_k: <span class="text-purple-400">50</span>,
  top_p: <span class="text-purple-400">0.9</span>,
  prompt: <span class="text-orange-400">"How is perplexity measured for LLMs and why is it useful?"</span>,
  max_tokens: <span class="text-purple-400">512</span>,
  min_tokens: <span class="text-purple-400">0</span>,
  temperature: <span class="text-purple-400">0.6</span>,
  system_prompt: <span class="text-orange-400">"You are a helpful assistant."</span>,
  presence_penalty: <span class="text-purple-400">0</span>,
  frequency_penalty: <span class="text-purple-400">0</span>
};

<span class="text-sky-400">for await</span> (<span class="text-sky-400">const</span> event <span class="text-sky-400">of</span> replicate.stream(
  <span class="text-orange-400">"ibm-granite/granite-3.2-8b-instruct"</span>,
  { input }
)) {
  process.stdout.write(event.toString());
}
`;


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
                        <span className="text-slate-300">Cara menghubungkan aplikasi Node.js ke Replicate API.</span>
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