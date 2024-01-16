import React from "react";
import { Link } from "./Link";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  handleOnClick?: () => {};
  text: string;
  link?: string;
  styles?: string;
  disabled?: boolean;
}

function Button({
  text,
  handleOnClick,
  type,
  styles,
  disabled = false,
}: {
  text: string;
  handleOnClick?: () => {};
  type: "button" | "submit" | "reset" | undefined;
  styles?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      className={`text-md w-full rounded-full bg-primary px-4 py-2 font-semibold text-black hover:bg-primary_var sm:w-fit ${styles} transition-all duration-300 ease-in disabled:scale-75 disabled:cursor-not-allowed disabled:opacity-50`}
      onClick={handleOnClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default function CustomButton({
  type,
  handleOnClick,
  text,
  link,
  styles,
  disabled = false,
}: ButtonProps) {
  return (
    <>
      {link ? (
        <Link href={link}>
          <Button
            text={text}
            handleOnClick={handleOnClick}
            type={type}
            styles={styles}
          />
        </Link>
      ) : (
        <Button
          text={text}
          handleOnClick={handleOnClick}
          type={type}
          styles={styles}
          disabled={disabled}
        />
      )}
    </>
  );
}
