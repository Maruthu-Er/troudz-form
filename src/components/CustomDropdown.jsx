import React, { useState, useEffect, useRef } from 'react';

const CustomDropdown = ({ 
  id, 
  name, 
  value, 
  onChange, 
  options, 
  icon: Icon, 
  label, 
  required, 
  disabled,
  placeholder = "Select an option"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);
  
  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  const selectedOption = options.find(opt => opt.value === value);
  
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label} {required && <span className="required">*</span>}
      </label>
      <div 
        ref={dropdownRef}
        className={`custom-dropdown-container ${isOpen ? 'dropdown-open' : ''}`}
      >
        <div className="form-select-wrapper">
          {Icon && <Icon />}
          <button
            type="button"
            id={id}
            className={`custom-dropdown-trigger ${value ? 'has-value' : ''}`}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            disabled={disabled}
          >
            <span className="dropdown-trigger-text">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <span className={`select-chevron ${isOpen ? 'chevron-open' : ''}`}></span>
          </button>
        </div>
        
        {isOpen && (
          <ul 
            className="custom-dropdown-menu"
            role="listbox"
            aria-labelledby={id}
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                role="option"
                className={`custom-dropdown-item ${value === option.value ? 'selected' : ''}`}
                aria-selected={value === option.value}
                onClick={() => handleSelect(option.value)}
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <span className="dropdown-item-text">{option.label}</span>
                {value === option.value && (
                  <span className="dropdown-item-check">✓</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;