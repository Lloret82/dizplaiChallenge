import React, { useState, useEffect, useRef } from 'react';

export default function PollSelector({ polls, selectedPollId, onSelectPoll }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState(
    polls.find((poll) => poll.id === selectedPollId) || null
  );
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSelect = (poll) => {
    setSelectedPoll(poll);
    onSelectPoll(poll.id); 
    setIsOpen(false); 
    setIsMobileMenuOpen(false); 
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); 
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mb-4 flex items-center justify-center" ref={dropdownRef}>
      {/* Desktop View */}
      <label className="mr-2 text-white font-semibold hidden md:block" htmlFor="poll-dropdown">
        Select Poll:
      </label>
      <div className="relative w-64 hidden md:block">
        {/* Dropdown Toggle */}
        <button
          id="poll-dropdown"
          className="w-full border border-white rounded-lg bg-purple-900/30 text-white text-left p-3 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-purple-500"
          onClick={toggleDropdown}
        >
          {selectedPoll ? selectedPoll.question : 'Select a Poll'}
          <span className="ml-2">▼</span>
        </button>

        {/* Dropdown Options */}
        {isOpen && (
          <ul className="absolute w-full mt-2 border border-white rounded-lg bg-purple-900/90 text-white z-10">
            {polls.map((poll) => (
              <li
                key={poll.id}
                className="p-3 hover:bg-purple-700 cursor-pointer"
                onClick={() => handleSelect(poll)}
              >
                {poll.question}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <button
          className="p-3 bg-white text-purple-900 rounded-lg shadow"
          onClick={toggleMobileMenu}
          aria-label="Open Mobile Menu"
        >
          ☰
        </button>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-10"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>

            {/* Dropdown Menu */}
            <div className="absolute top-12 right-0 w-64 border border-white rounded-lg bg-purple-900/90 shadow-lg z-20">
              <ul className="divide-y divide-white">
                {polls.map((poll) => (
                  <li
                    key={poll.id}
                    className="p-4 hover:bg-purple-700 text-white cursor-pointer"
                    onClick={() => handleSelect(poll)}
                  >
                    {poll.question}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
