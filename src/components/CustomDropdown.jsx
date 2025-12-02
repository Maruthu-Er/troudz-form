import React, { useState, useRef, useEffect } from "react";

export default function Dropdown({ label, Icon, value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <label className="form-label">
        {label} <span className="required">*</span>
      </label>

      <div
        className={`dropdown-field ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <Icon />

        <p className={`dropdown-value ${value ? "filled" : ""}`}>
          {value || "Select option"}
        </p>

        <span className={`dropdown-arrow ${open ? "rotate" : ""}`}>⌄</span>
      </div>

      {open && (
        <ul className="dropdown-list">
          {options.map((opt, index) => (
            <li
              key={index}
              className="dropdown-option"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
