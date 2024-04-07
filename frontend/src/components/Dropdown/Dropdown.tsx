import React, { useState } from 'react';

type InputWithDropdownProps = {
  value: string;
  name: string;
  options: string[];
  onChange: (value: string) => void;
};

const InputWithDropdown: React.FC<InputWithDropdownProps> = ({ value, name, options, onChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        value={value}
        name={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        onFocus={toggleDropdown}
        onBlur={toggleDropdown}
        className="rounded-md px-2 py-1 border border-gray-400"
      />
      {isDropdownOpen && (
        <select
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            toggleDropdown(); // Close the dropdown after selecting an option
          }}
          style={{ position: 'absolute', top: '100%', left: 0, zIndex: 999 }}
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
