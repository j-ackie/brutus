import React, { useState, useEffect, useRef } from 'react';
import Input from './Input';
import { Label } from './Text';
import { COLORS } from './Colors';

type InputWithDropdownProps = {
  value: string;
  name: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
};

const InputWithDropdown: React.FC<InputWithDropdownProps> = ({ value, name, options, onChange, className }) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // This function now directly accepts a string argument, the option value
  const handleOptionClick = (option: string) => {
    setSelectedValue(option);
    onChange(option);
    setIsDropdownOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <Input
        type="text"
        value={selectedValue}
        name={name}
        readOnly
        onFocus={() => setIsDropdownOpen(true)}
        className="p-2 w-full outline-none border-b-2 focus:border-b-accent text-text bg-transparent"
      />
      {isDropdownOpen && (
        <div className="absolute z-10 rounded-xl border border-gray-400 mt-1 w-full overflow-hidden">
          {options.map((option) => (
            <div 
              key={option}
              className={`px-1 py-1 bg-white cursor-pointer ${selectedValue === option ? 'bg-accent text-black' : 'text-black hover:bg-lightblue'}`}
              onClick={() => handleOptionClick(option)} // Use handleOptionClick here
            >
              <Label text={option} color={COLORS.black} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputWithDropdown;
