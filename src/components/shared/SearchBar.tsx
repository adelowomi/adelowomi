import React, { useState, useEffect } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  value?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  onSearch,
  value = "",
  className = "w-full sm:w-[484px]",
}) => {
  const [searchValue, setSearchValue] = useState(value);

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
  };

  // Debounce effect for search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch?.(searchValue);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchValue, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchValue);
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <form onSubmit={handleSubmit} className="relative w-full max-w-md">
        <input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleInputChange}
          className="w-full py-2 sm:py-3 px-3 sm:px-4 pr-10 sm:pr-12 rounded-lg bg-black border-[0.5px] border-solid border-[#FCFCFC33] text-primary placeholder-gray-500 focus:outline-none focus:border-primary text-sm sm:text-base"
        />
        <button
          type="submit"
          className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
        >
          <svg
            width="16"
            height="16"
            className="sm:w-5 sm:h-5"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 19L7 13M12 1C11.0807 1 10.1705 1.18106 9.32122 1.53284C8.47194 1.88463 7.70026 2.40024 7.05025 3.05025C6.40024 3.70026 5.88463 4.47194 5.53284 5.32122C5.18106 6.1705 5 7.08075 5 8C5 8.91925 5.18106 9.82951 5.53284 10.6788C5.88463 11.5281 6.40024 12.2997 7.05025 12.9497C7.70026 13.5998 8.47194 14.1154 9.32122 14.4672C10.1705 14.8189 11.0807 15 12 15C12.9193 15 13.8295 14.8189 14.6788 14.4672C15.5281 14.1154 16.2997 13.5998 16.9497 12.9497C17.5998 12.2997 18.1154 11.5281 18.4672 10.6788C18.8189 9.82951 19 8.91925 19 8C19 7.08075 18.8189 6.1705 18.4672 5.32122C18.1154 4.47194 17.5998 3.70026 16.9497 3.05025C16.2997 2.40024 15.5281 1.88463 14.6788 1.53284C13.8295 1.18106 12.9193 1 12 1Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
