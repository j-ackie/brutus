import React, { useState, useEffect, useRef } from 'react';
import Input from './Input'; // Assuming this is styled as desired
import { TextButton } from './Buttons'; // Assuming this is styled as desired
import { Label, SubHeading } from './Text';
import { COLORS } from './Colors';

interface MultiSelectProps {
  options: string[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  className?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues,
  onChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSelectChange = (option: string) => {
    const currentIndex = selectedValues.indexOf(option);
    const newSelectedValues = [...selectedValues];
    if (currentIndex === -1) {
      newSelectedValues.push(option);
    } else {
      newSelectedValues.splice(currentIndex, 1);
    }
    onChange(newSelectedValues);
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <Input
        type="text"
        name="multiselect"
        value={selectedValues.join(', ')}
        readOnly
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 w-full outline-none border-b-2 focus:border-b-accent text-text bg-transparent" // Additional input styling here
      />

      {isOpen && (
        <div className="absolute z-10 rounded-xl border border-gray-400 mt-1 w-full overflow-hidden">
          {options.map((option) => (
            <Label
              text={option}
              color={COLORS.black}
              key={option}
              onClick={() => handleSelectChange(option)}
              className={`px-1 py-1 bg-text ${selectedValues.includes(option) ? 'bg-accent text-black' : 'hover:bg-lightblue text-black'}`}
            >
            </Label>

            
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
