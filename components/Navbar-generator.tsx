const Navbar_generator = () => {
    return (
            <header className="absolute inset-x-0 top-0 mx-10 w-96">
                  <nav aria-label="Global" className="flex items-center justify-between my-10 lg:mx-auto container w-auto">
                  <div className="flex lg:flex-1 items-center">
                        <a href="/" className="-m-1.5 p-1.5">
                              <span className="sr-only">Raspa</span>
                              <img src="logo.svg" alt="Raspa Logo" className="h-8 w-auto" />
                        </a>
                        <a className="ml-3 font-semibold text-xl" href="/">AI Code</a>
                  </div>
                        <button className="flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2 text-white font-semibold hover:bg-gray-700 transition duration-300">
                              <img className="w-5 h-5" src="bagikan.svg" alt="Ikon bagikan" />
                              <span>Bagikan</span>
                        </button>
                  </nav>

            </header>
      )
};

export default Navbar_generator;