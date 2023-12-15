"use client";
import { Dialog, Transition } from "@headlessui/react";
import { useState, useEffect, Fragment } from "react";

type TransactionModalProps = {
  isLoading?: boolean;
  isSuccess?: boolean;
  disabledButton?: any;
  label: string;
  writeFunction?: () => void;
};

export default function TransactionModal({
  isLoading,
  isSuccess,
  disabledButton,
  label,
  writeFunction,
}: TransactionModalProps) {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (openModal) {
      writeFunction?.();
    }
  }, [openModal]);

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="rounded-full border px-6 py-1 transition-opacity duration-300 ease-in-out hover:border-primary hover:bg-primary hover:text-highlight disabled:cursor-not-allowed disabled:opacity-50"
        disabled={disabledButton}
      >
        {openModal ? "Check Your Wallet" : label}
      </button>
      <Transition.Root show={openModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-700 bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-surface px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div className="flex justify-center">
                    {isLoading && (
                      <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary" />
                    )}

                    {isSuccess && (
                      <div className="text-6xl text-primary">&#10003;</div>
                    )}
                  </div>

                  <div className="mt-4 text-center">
                    {isLoading && (
                      <>
                        <p className="text-textSecondary">
                          Processing transaction...
                        </p>
                        <p className="text-textSecondary">Check Your Wallet</p>
                      </>
                    )}
                    {isSuccess && (
                      <p className="text-surface_var">
                        Transaction successful!
                      </p>
                    )}
                  </div>

                  {isSuccess && (
                    <div className="mt-5 sm:mt-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-background px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-highlight hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => setOpenModal(false)}
                      >
                        Go back to dashboard
                      </button>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}