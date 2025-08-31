'use client'

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import "../app/globals.css"

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activePage, setActivePage] = useState("");
    const pathname = usePathname();
    
    const navLinks = [
        { name: 'How It Works', href: '/how-it-works'},
        { name: 'Company', href: '/company' },
        { name: 'Blog', href: '/blog' },
        { name: 'Pricing', href: '/pricing' },
    ];

    // Deteksi halaman aktif saat pathname berubah
    useEffect(() => {
        setActivePage(pathname);
    }, [pathname]);

    return (
        <header className="absolute inset-x-0 p-6">
            <nav className="flex items-center font-stretch-90% justify-between lg:px-8 h-full">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">AI Code</span>
                        <img src="logo.svg" alt="AI Code Logo" className="h-8 w-auto" />
                    </a>
                    <a className="ml-3 text-xl" href="/">AI Code</a>
                </div>
                <div className="flex lg:hidden">
                    <button type="button" onClick={() => setMobileMenuOpen(true)} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-800">
                        <span className="sr-only">Open main menu</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="size-6">
                            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-3 border border- px-2 py-[2px] rounded-full border-[#555eff]">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name} 
                            href={link.href} 
                            className={`text-sm font-stretch-50% px-4 py-1 rounded-3xl transition-all duration-50 ${
                                activePage === link.href 
                                    ? "text-[#3779ba] font-medium" 
                                    : "text-gray-600 hover:text-[#3779ba]"
                            }`}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <div className="py-[4px] transition border border-white/10 px-1 rounded-3xl bg-gray-700 bg-blur-sm hover:bg-gradient-to-r from-blue-800 to-cyan-800 hover:scale-105 transform duration-300 ease-in-out">
                        <a 
                            href="/login" 
                            className="flex rounded-full text-sm px-5 font-stretch-50% items-center text-white transition"
                        >
                            Login
                        </a>
                    </div>
                </div>
            </nav>
            {mobileMenuOpen && (
                <div className="lg:hidden">
                    <div className="fixed inset-0 z-50 bg-black/20" onClick={() => setMobileMenuOpen(false)} />
                    <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="/" className="-m-1.5 p-1.5">
                                <span className="sr-only">Raspa</span>
                                <img src="logo.svg" alt="Raspa Logo" className="h-8 w-auto" />
                            </a>
                            <button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-gray-700">
                                <span className="sr-only">Close menu</span>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="size-6">
                                    <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navLinks.map((link) => (
                                        <a 
                                            key={link.name} 
                                            href={link.href} 
                                            className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-medium ${
                                                activePage === link.href 
                                                    ? "bg-gray-100 text-indigo-600" 
                                                    : "text-gray-900 hover:bg-gray-50"
                                            }`}
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </a>
                                    ))}
                                </div>
                                <div className="py-6">
                                    <a 
                                        href="/login" 
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Log in
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;