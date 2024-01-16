import { Fragment, useState, useEffect, Key } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

// TODO: move func to utils folder
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface List {
  [x: string]: Key | null | undefined;
  name: string;
  symbol: string;
  address: string;
}

interface InputFormProps {
  list: List[];
  name: string;
  label?: string;
  handleChange: (value: string, name: string) => void;
  required?: boolean;
}

export default function InputSelect({
  list,
  name,
  label = undefined,
  handleChange,
  required = false,
}: InputFormProps) {
  const [selected, setSelected] = useState(list[0]);

  useEffect(() => {
    if (selected) {
      handleChange(selected.address, name);
    }
  }, [selected]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          {label && (
            <Listbox.Label htmlFor={name} className="block text-textSecondary">
              {label}
              {required && " *"}
            </Listbox.Label>
          )}
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-surface py-1.5 pl-3 pr-10 text-left text-textSecondary shadow-sm ring-1 ring-inset ring-grey_mlight focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6">
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-grey_mlight"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-grey_dark py-1 text-base shadow-lg ring-1 ring-grey_mlight focus:outline-none sm:text-sm">
                {list.map((listItem) => (
                  <Listbox.Option
                    key={listItem.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-primary" : "text-white",
                        "relative cursor-default select-none py-2 pl-3 pr-9",
                      )
                    }
                    value={listItem}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate",
                          )}
                        >
                          {listItem.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-primary" : "text-primary",
                              "absolute inset-y-0 right-0 flex items-center pr-4",
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
