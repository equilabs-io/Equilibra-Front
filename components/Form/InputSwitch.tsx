import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface SwitchProps {
  name: string;
  label?: string;
  value: boolean;
  handleChange: (value: boolean, name: string) => void;
}

export default function InputSwitch({
  name,
  label,
  value,
  handleChange,
}: SwitchProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    handleChange(enabled, name);
  }, [enabled]);

  return (
    <>
      {label && (
        <label htmlFor={name} className="block">
          {label}
        </label>
      )}
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={classNames(
          enabled ? "bg-primary" : "bg-grey_light",
          "relative mt-2 inline-flex h-7 w-[52px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          className={classNames(
            enabled ? "translate-x-6" : "translate-x-0",
            "pointer-events-none relative inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        >
          <span
            className={classNames(
              enabled
                ? "opacity-0 duration-100 ease-out"
                : "opacity-100 duration-200 ease-in",
              "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
            )}
            aria-hidden="true"
          >
            <svg
              className="h-4 w-4 text-grey_mlight"
              fill="none"
              viewBox="0 0 12 12"
            >
              <path
                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span
            className={classNames(
              enabled
                ? "opacity-100 duration-200 ease-in"
                : "opacity-0 duration-100 ease-out",
              "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
            )}
            aria-hidden="true"
          >
            <svg
              className="h-4 w-4 text-grey_mdark"
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
            </svg>
          </span>
        </span>
      </Switch>
    </>
  );
}
