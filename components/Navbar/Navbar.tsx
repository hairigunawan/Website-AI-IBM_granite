'use client'

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import "../../app/globals.css"
import { SiProbot } from "react-icons/si"
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activePage, setActivePage] = useState("")
  const pathname = usePathname()

  // ✅ Ambil session dari next-auth
  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated"

  const navLinks = [
    { name: "How It Works", href: "/how-it-works" },
    { name: "Company", href: "/company" },
    { name: "Blog", href: "/blog" },
    { name: "Pricing", href: "/pricing" },
  ]

  // Deteksi halaman aktif saat pathname berubah
  useEffect(() => {
    setActivePage(pathname)
  }, [pathname])

  const handleAuthClick = () => {
    if (isAuthenticated) {
      signOut({ callbackUrl: "/" }) // ✅ Logout dan balik ke home
    } else {
      signIn() // ✅ Login pakai provider yang sudah kamu setup (Google/GitHub)
    }
  }

  return (
    // ... sisa JSX Anda (tidak ada perubahan) ...
    <header className="absolute inset-x-0 p-6">
      <nav className="flex items-center justify-between lg:px-8 h-full">
        <div className="flex lg:flex-1">
          <a
            href="/"
            className="-m-1.5 p-1.5 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
          >
            <SiProbot className="h-6 w-6 pb-[2px] text-zinc-700" />
            <span className="text-xl font-semibold">AI Code</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-800"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
              className="size-6"
            >
              <path
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Desktop nav links */}
        <div className="hidden lg:flex lg:gap-x-3 border px-2 py-[2px] rounded-full border-[#555eff]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm px-4 py-1 rounded-3xl transition-all duration-50 ${
                activePage === link.href
                  ? "text-[#3779ba] font-medium"
                  : "text-gray-600 hover:text-[#3779ba]"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Auth button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            onClick={handleAuthClick}
            className="cursor-pointer py-[4px] px-1 rounded-3xl bg-gray-700 hover:bg-gradient-to-r from-blue-800 to-cyan-800 hover:scale-105 transform duration-300 ease-in-out"
          >
            <span className="flex rounded-full text-sm px-5 items-center text-white transition">
              {isAuthenticated ? "Logout" : "Login"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 z-50 bg-black/20"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">AI Code</span>
                <img src="logo.svg" alt="AI Code Logo" className="h-8 w-auto" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                  className="size-6"
                >
                  <path
                    d="M6 18 18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
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
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      handleAuthClick()
                    }}
                    className="-mx-3 block w-full text-left rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {isAuthenticated ? "Logout" : "Login"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar