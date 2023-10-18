import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

interface List {
  id: number;
  name: string;
}

interface InputFormProps {
  list: List[];
  name: string;
  label?: string;
  value: string | number;
  handleChange: (value: string | number, name: string) => void;
  required?: boolean;
}

export default function InputSelect({
  list,
  name,
  label = undefined,
  value,
  handleChange,
  required = false,
}: InputFormProps) {
  const [selected, setSelected] = useState({ id: 0, name: "example" });

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          {label && (
            <Listbox.Label
              htmlFor={name}
              className="block text-sm font-medium leading-6 "
            >
              {label}
              {required && " *"}
            </Listbox.Label>
          )}
          <div className="relative mt-2">
            <Listbox.Button className="relative cursor-pointer w-full rounded-md bg-grey_dark py-1.5 pl-3 pr-10 text-left text-white shadow-sm ring-1 ring-inset ring-grey_mlight focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6">
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
                {list.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-primary" : "text-white",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {person.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-primary" : "text-primary",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
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
