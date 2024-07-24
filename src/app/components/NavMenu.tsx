import React, { useState } from 'react';

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative lg:hidden">
      <button
        onClick={handleClick}
        className="flex flex-col justify-center items-center p-2"
      >
        <span
          className={`bg-gray-500 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
          }`}
        ></span>
        <span
          className={`bg-gray-500 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
        ></span>
        <span
          className={`bg-gray-500 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
          }`}
        ></span>
      </button>
      <div
        className={`absolute right-0 mt-4 w-48 bg-gray-300 rounded-md shadow-lg py-2 transition-transform duration-300 ease-out ${
          isOpen ? 'transform scale-100' : 'transform scale-0'
        }`}
      >
        <a
          href="https://open.spotify.com"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-200 font-sourcecode"
        >
          Open Spotify in Browser
        </a>
        <a
          href="spotify:app"
          className="block px-4 py-2 text-gray-800 hover:bg-gray-200 font-sourcecode"
        >
          Open Spotify App
        </a>
      </div>
    </div>
  );
};

export default NavMenu;
