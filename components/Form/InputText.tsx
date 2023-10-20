import React from "react";

interface InputFormProps {
  value?: string | number;
  handleChange: (value: string | number, name: string) => void;
  type?: string;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
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
}: InputFormProps) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    handleChange(e.target.value, name);
  };

  return (
    <>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm leading-6 text-white font-thin"
        >
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
            className="block w-full h-full text-white placeholder-grey_light first:rounded-md border-0 bg-grey_dark py-1.5 px-3 shadow-sm ring-1 ring-inset focus:outline-none ring-grey_mlight focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            placeholder={placeholder}
          />
        ) : (
          <input
            required={required}
            type={type}
            name={name}
            id={name}
            onChange={handleInputChange}
            value={value}
            autoComplete={name}
            className="block w-full text-white placeholder-grey_light rounded-md border-0 bg-grey_dark py-1.5 px-3 shadow-sm ring-1 ring-inset focus:outline-none ring-grey_mlight focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            placeholder={placeholder}
          />
        )}
      </div>
    </>
  );
}
