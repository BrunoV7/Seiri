import { useState, useRef, useEffect } from "react";

type InputRenameProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function InputRename({ value, onChange }: InputRenameProps) {
  const [editing, setEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  // Update local value when prop changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleSave = (newValue: string) => {
    const trimmed = newValue.trim();
    if (trimmed && trimmed !== value) {
      onChange(trimmed);
    }
    setLocalValue(value); // Reset to original if cancelled
    setEditing(false);
  };

  return (
    <div className="inline-block min-w-0">
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={(e) => handleSave(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSave(e.currentTarget.value);
            }
            if (e.key === "Escape") {
              setLocalValue(value); // Reset on escape
              setEditing(false);
            }
          }}
          className="
            text-2xl font-medium bg-transparent
            outline-none border-none
            px-1 py-0.5 rounded-md
            ring-2 ring-blue-500 dark:ring-blue-400
            w-full min-w-[100px]
          "
          style={{ width: spanRef.current?.offsetWidth || 'auto' }}
        />
      ) : (
        <span
          ref={spanRef}
          onClick={() => setEditing(true)}
          className="
            inline-block text-2xl font-medium cursor-text select-none
            px-1 py-0.5 rounded-md
            transition-colors
            hover:bg-gray-100 hover:text-gray-900
            dark:hover:bg-gray-800 dark:hover:text-gray-100
          "
        >
          {value}
        </span>
      )}
    </div>
  );
}