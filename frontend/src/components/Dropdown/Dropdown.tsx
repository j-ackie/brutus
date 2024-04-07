import React, { useState, useRef, useEffect } from 'react';

type InputWithDropdownProps = {
  value: string;
  name: string;
  options: string[];
  onChange: (value: string) => void;
};

const InputWithDropdown: React.FC<InputWithDropdownProps> = ({ value, name, options, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLSelectElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handler to close dropdown if clicked outside
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setSelectedValue(selectedOption);
    onChange(selectedOption);
    setIsDropdownOpen(false); // Explicitly close the dropdown
  };

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  // Adjusted onBlur handler to account for focus within the dropdown
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Delay hiding dropdown to allow for selection
    setTimeout(() => {
      // Check if the new focus is not on the dropdown
      if (!dropdownRef.current?.contains(document.activeElement)) {
        setIsDropdownOpen(false);
      }
    }, 200);
  };

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <input
        ref={inputRef}
        type="text"
        value={selectedValue}
        name={name}
        onChange={(e) => setSelectedValue(e.target.value)}
        onFocus={handleInputFocus}
        onBlur={handleBlur}
        className="rounded-md px-2 py-1 border border-gray-400"
      />
      {isDropdownOpen && (
        <select
          ref={dropdownRef}
          value={selectedValue}
          onChange={handleSelectChange}
          size={options.length}
          style={{ position: 'absolute', top: '100%', left: 0, zIndex: 999, width: '100%', overflow: 'auto' }}
          // Removed onBlur from select to simplify state management
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default InputWithDropdown;
