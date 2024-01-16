import React from "react";

interface InputFormProps {
  value?: string | number;
  handleChange: (
    value: string | number,
    name: string,
    index: number | undefined,
  ) => void;
  type?: string;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  index?: number;
  disabled?: boolean;
}

export default function InputText({
  value,
  handleChange,
  type = "text",
  name,
  label = undefined,
  placeholder,
  required = false,
  rows,
  index,
  disabled = false,
}: InputFormProps) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    handleChange(e.target.value, name, index);
  };
  return (
    <>
      {label && (
        <label htmlFor={name} className="block text-textSecondary">
          {label}
          {required && "  *"}
        </label>
      )}

      <div className="mt-2">
        {type == "textarea" ? (
          <textarea
            required={required}
            name={name}
            id={name}
            onChange={handleInputChange}
            rows={rows}
            value={value}
            autoComplete={name}
            className="block h-full w-full  border-0 bg-surface px-3 py-1.5 text-sm leading-6 placeholder-grey_light shadow-sm ring-1 ring-inset ring-grey_mlight first:rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={placeholder}
            disabled={disabled}
          />
        ) : (
          <input
            disabled={disabled}
            required={required}
            type={type}
            name={name}
            id={name}
            onChange={handleInputChange}
            value={value}
            autoComplete={name}
            className="block w-full rounded-md border-0 bg-surface px-3 py-1.5 text-sm leading-6 text-white placeholder-grey_light shadow-sm ring-1 ring-inset ring-grey_mlight focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={placeholder}
          />
        )}
      </div>
    </>
  );
}
