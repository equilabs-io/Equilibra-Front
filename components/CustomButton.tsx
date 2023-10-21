import React from "react";
import { Link } from "./Link";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  handleOnClick?: () => {};
  text: string;
  link?: string;
  styles?: string;
}

function Button({
  text,
  handleOnClick,
  type,
  styles,
}: {
  text: string;
  handleOnClick?: () => {};
  type: "button" | "submit" | "reset" | undefined;
  styles?: string;
}) {
  return (
    <button
      type={type}
      className={`text-md font-semibold bg-primary text-black py-2 px-4 rounded-full hover:bg-primary_var w-full sm:w-fit ${styles}`}
      onClick={handleOnClick}
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
        />
      )}
    </>
  );
}
