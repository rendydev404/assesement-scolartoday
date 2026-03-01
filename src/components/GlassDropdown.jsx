import { useState, useRef, useEffect } from "react";

export default function GlassDropdown({
  value,
  onChange,
  options,
  placeholder = "Select...",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    options.find((o) => o.value === value)?.label || placeholder;

  return (
    <div
      ref={dropdownRef}
      className="relative w-full sm:w-44"
      style={{ zIndex: isOpen ? 50 : 1 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-[14px] text-[14px] font-medium"
        style={{
          background: "var(--bg-secondary)",
          border: `1px solid ${isOpen ? "var(--violet)" : "var(--border)"}`,
          color: "var(--text-1)",
          boxShadow: isOpen ? "0 0 0 3px var(--violet-soft)" : "var(--shadow)",
          transition: "border-color 0.15s, box-shadow 0.15s",
        }}
      >
        <span className="truncate">{selectedLabel}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          style={{ color: "var(--text-4)" }}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-2 overflow-hidden animate-fade-in"
          style={{
            zIndex: 999,
            borderRadius: "14px",
            background: "var(--dropdown-bg)",
            backdropFilter: "blur(80px) saturate(200%)",
            WebkitBackdropFilter: "blur(80px) saturate(200%)",
            border: "1px solid var(--dropdown-border)",
            boxShadow: "var(--dropdown-shadow)",
          }}
        >
          <div className="py-1.5 max-h-64 overflow-y-auto">
            {options.map((option, i) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-[10px] text-[14px] flex items-center justify-between"
                style={{
                  color:
                    value === option.value ? "var(--violet)" : "var(--text-2)",
                  fontWeight: value === option.value ? 600 : 400,
                  background:
                    value === option.value
                      ? "var(--violet-soft)"
                      : "transparent",
                  borderBottom:
                    i < options.length - 1
                      ? "1px solid var(--dropdown-divider)"
                      : "none",
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) => {
                  if (value !== option.value)
                    e.currentTarget.style.background =
                      "var(--dropdown-hover-bg)";
                }}
                onMouseLeave={(e) => {
                  if (value !== option.value)
                    e.currentTarget.style.background = "transparent";
                }}
              >
                <span>{option.label}</span>
                {value === option.value && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    style={{ color: "var(--violet)" }}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
